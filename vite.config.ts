import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';


export default {
  plugins: [
    vue(),
    Components({
      resolvers: [VantResolver()],
    }),
  ],
  build: {
    // 设置为 false 禁用文件名哈希
    chunkFileNames: 'static/[name].[hash].js',
    // 设置为 true 强制每次构建都生成新的文件名
    emitAssets: true,
  }
};
