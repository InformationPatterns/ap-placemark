# AP Maps

<<<<<<< HEAD
Editor de mapas geoespacial basado en [Placemark Play](https://github.com/placemark/placemark), personalizado para AgroPatterns. Permite visualizar y editar datos geográficos directamente en el navegador, con soporte para estilos de fincas Mapbox y simbolización por categorías.
=======
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fplacemark%2Fplacemark&env=VITE_PUBLIC_MAPBOX_TOKEN)
>>>>>>> 3d4f655fd1306f3f6e8124309e4a4658cc7c5109

## Requisitos previos

- **Node.js** >= 22.19.0
- **pnpm** 10.13.1
- Se recomienda usar [mise](https://mise.jdx.dev/) para manejar las versiones automáticamente

## Instalación

1. Clonar el repositorio e instalar dependencias:

```sh
git clone <url-del-repositorio>
cd ap-placemark
pnpm install
```

2. Crear el archivo `.env` con tu token de Mapbox (ver `.env.example`):

```sh
<<<<<<< HEAD
VITE_PUBLIC_MAPBOX_TOKEN=pk.tu_token_aqui
VITE_PUBLIC_GEOCODE_EARTH_TOKEN=tu_token_aqui
=======
VITE_PUBLIC_MAPBOX_TOKEN="<your Mapbox public access token>" \
VITE_PUBLIC_GEOCODE_EARTH_TOKEN="<your Geocode Earth token>" \
pnpm build

>>>>>>> 3d4f655fd1306f3f6e8124309e4a4658cc7c5109
```

Puedes obtener el token de Mapbox en [account.mapbox.com](https://account.mapbox.com/) y el de Geocode Earth en [app.geocode.earth/keys](https://app.geocode.earth/keys).

## Ejecución

Para iniciar el servidor de desarrollo:

```sh
pnpm dev
```

O si configuraste el alias:

<<<<<<< HEAD
```sh
ap-maps
```

Luego visita [http://localhost:5173](http://localhost:5173). Desde Chrome puedes instalarlo como aplicación de escritorio usando el menú > "Instalar Placemark...".

## Comandos disponibles

| Comando | Descripción |
|---|---|
| `pnpm dev` | Servidor de desarrollo |
| `pnpm build` | Compilar para producción |
| `pnpm lint` | Verificar código con Biome |
| `pnpm tsc` | Verificar tipos TypeScript |
| `pnpm test` | Ejecutar tests |
| `pnpm test:watch` | Tests en modo observador |

## Funcionalidades principales

- **Fincas**: Selector de estilos Mapbox por finca, con centrado automático y nombre visible en el mapa
- **Capas**: Soporte para capas Mapbox, XYZ y TileJSON
- **Simbolización**: Categorización por colores sin límite de categorías
- **Formatos**: Importar/exportar GeoJSON, KML, CSV, Shapefile, GPX, TopoJSON y más
- **Edición**: Dibujar puntos, líneas, polígonos, rectángulos y círculos

## Datos de fincas

Los estilos de fincas se configuran en `data/mabox_styles.csv` con las columnas: `Finca`, `GroupId`, `Survey`, `2025`, `MapboxStyle`.
=======
If you're planning to run this often or publicly, take care to secure your
tokens better by adding [URL restrictions to the Mapbox token](https://docs.mapbox.com/help/getting-started/access-tokens/#url-restrictions) and setting allowed Referrer Hostnames to the Geocode Earth one.

For local development, copy `.env.example` to `.env.local` and add your tokens there:
```sh
cp .env.example .env.local
```
>>>>>>> 3d4f655fd1306f3f6e8124309e4a4658cc7c5109
