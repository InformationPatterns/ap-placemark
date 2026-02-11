import {
  ColorWheelIcon,
  DownloadIcon,
  HomeIcon,
  LayersIcon,
  MagnifyingGlassIcon,
  TableIcon,
  UploadIcon,
} from "@radix-ui/react-icons";
import * as E from "app/components/elements";
import { useOpenFiles } from "app/hooks/use_open_files";
import { getIsMac, localizeKeybinding } from "app/lib/utils";
import { useAtom, useSetAtom } from "jotai";
import { Popover, Tooltip as T } from "radix-ui";
import { memo, Suspense, useState } from "react";
import { dialogAtom, splitsAtom, TabOption, tabAtom } from "state/jotai";
import { SEARCH_KEYBINDING } from "./dialogs/cheatsheet";
import { FincasPopover, LayersPopover } from "./layers/popover";

function ToolbarButton({
  label,
  icon,
  onClick,
}: {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <div className="block h-10 w-10 p-1 flex items-stretch">
      <T.Root>
        <T.Trigger asChild>
          <E.Button variant="quiet" aria-label={label} onClick={onClick}>
            {icon}
          </E.Button>
        </T.Trigger>
        <E.TContent side="bottom">
          <span className="whitespace-nowrap">{label}</span>
        </E.TContent>
      </T.Root>
    </div>
  );
}

export const Visual = memo(function Visual() {
  const setDialogState = useSetAtom(dialogAtom);
  const openFiles = useOpenFiles();
  const isMac = getIsMac();
  const [fincasOpen, setFincasOpen] = useState(false);
  const [splits, setSplits] = useAtom(splitsAtom);
  const [activeTab, setTab] = useAtom(tabAtom);

  function togglePanel(tab: TabOption) {
    if (splits.rightOpen && activeTab === tab) {
      setSplits((s) => ({ ...s, rightOpen: false }));
    } else {
      setTab(tab);
      setSplits((s) => ({ ...s, rightOpen: true }));
    }
  }

  return (
    <div className="flex items-center">
      <div className="block h-10 w-10 p-1 flex items-stretch">
        <T.Root>
          <T.Trigger asChild>
            <E.Button
              variant="quiet"
              aria-label="Search"
              onClick={() => {
                setDialogState({ type: "quickswitcher" });
              }}
            >
              <MagnifyingGlassIcon />
            </E.Button>
          </T.Trigger>
          <E.TContent>
            <div className="flex items-center gap-x-2">
              Search{" "}
              <E.Keycap>
                {localizeKeybinding(SEARCH_KEYBINDING, isMac)}
              </E.Keycap>
            </div>
          </E.TContent>
        </T.Root>
      </div>

      <T.Root>
        <Popover.Root open={fincasOpen} onOpenChange={setFincasOpen}>
          <div className="h-10 w-10 p-1 flex items-stretch">
            <T.Trigger asChild>
              <Popover.Trigger aria-label="Fincas" asChild>
                <E.Button variant="quiet">
                  <HomeIcon />
                </E.Button>
              </Popover.Trigger>
            </T.Trigger>
          </div>
          <E.PopoverContent2 size="sm">
            <Suspense fallback={<E.Loading size="sm" />}>
              <FincasPopover onDone={() => setFincasOpen(false)} />
            </Suspense>
          </E.PopoverContent2>
        </Popover.Root>
        <E.TContent side="bottom">
          <span className="whitespace-nowrap">Fincas</span>
        </E.TContent>
      </T.Root>

      <T.Root>
        <Popover.Root>
          <div className="h-10 w-10 p-1 flex items-stretch">
            <T.Trigger asChild>
              <Popover.Trigger aria-label="Layers" asChild>
                <E.Button variant="quiet">
                  <LayersIcon />
                </E.Button>
              </Popover.Trigger>
            </T.Trigger>
          </div>
          <E.PopoverContent2 size="md">
            <Suspense fallback={<E.Loading size="sm" />}>
              <LayersPopover />
            </Suspense>
          </E.PopoverContent2>
        </Popover.Root>
        <E.TContent side="bottom">
          <span className="whitespace-nowrap">Capas</span>
        </E.TContent>
      </T.Root>

      <ToolbarButton
        label="Importar"
        icon={<UploadIcon />}
        onClick={() => openFiles()}
      />

      <ToolbarButton
        label="Exportar"
        icon={<DownloadIcon />}
        onClick={() => setDialogState({ type: "export" })}
      />

      <ToolbarButton
        label="Tabla"
        icon={<TableIcon />}
        onClick={() => togglePanel(TabOption.Table)}
      />

      <ToolbarButton
        label="Simbolización"
        icon={<ColorWheelIcon />}
        onClick={() => togglePanel(TabOption.Symbolization)}
      />
    </div>
  );
});
