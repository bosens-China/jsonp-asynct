import typescript from 'rollup-plugin-typescript2';
import filesize from 'rollup-plugin-filesize';
// 清理文件夹
import del from 'rollup-plugin-delete';
// 压缩
import { terser } from 'rollup-plugin-terser';

export default [
  {
    input: './src/main.ts',
    plugins: [
      del({
        targets: 'dist/*',
      }),
      typescript({
        clean: true,
      }),
      terser({
        sourcemap: true,
        include: [/^.+\.min\.js$/],
      }),
      filesize(),
    ],
    output: [
      {
        file: 'dist/main.esm.min.js',
        format: 'es',
        sourcemap: true,
      },
      // {
      //   file: 'dist/main.esm.js',
      //   format: 'es',
      //   sourcemap: true,
      // },
    ],
  },
  {
    input: './src/main.ts',
    plugins: [
      typescript({
        clean: true,
      }),
      terser({
        sourcemap: true,
        include: [/^.+\.min\.js$/],
      }),
      filesize(),
    ],
    output: [
      {
        file: 'dist/main.min.js',
        format: 'cjs',
        sourcemap: true,
      },
      // {
      //   file: 'dist/main.js',
      //   format: 'cjs',
      //   sourcemap: true,
      // },
    ],
  },
];
