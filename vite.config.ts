import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import tmuiCss from "./src/tmui/tool/vitePlugs/tmuiCss";
import {resolve} from "path"
import AutoImport from 'unplugin-auto-import/vite'
import Unocss from 'unocss/vite'
// import Components from 'unplugin-vue-components/vite'
// https://vitejs.dev/config/
export default defineConfig({
	dts: true,
	resolve:{
		alias:[
			{
				find:"@",
				replacement:resolve(__dirname,'src')
			}
		]
	},
	plugins: [
		AutoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue\??/,
        /\.nvue\??/,
      ],
      imports: ['uni-app', 'vue', 'pinia', {
        '@/utils': ['tips', 'addr', 'go', 'redirect', 'back', 'formatTime'],
      }],
      dirs: [
        './src/api',
        './src/store',
      ],
      eslintrc: {
        enabled: true,
      },
    }),
		uni(),
    Unocss(),
	]
});
