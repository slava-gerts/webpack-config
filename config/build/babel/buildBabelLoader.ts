import {BuildOptions} from '../types/types'
import { removeDataTestIdPlugin } from './removeDataTestIdPlugin'

export function buildBabelLoader({mode}: BuildOptions) {
  const isDevelopment = mode === 'development'

  const plugins = []

  if (!isDevelopment) {
    plugins.push([
        removeDataTestIdPlugin,
        {
          props: ['data-testid']
        }
    ])
  }

  return {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: [
          '@babel/preset-env',
          '@babel/preset-typescript',
          [
            '@babel/preset-react',
            {
              runtime: isDevelopment ? 'automatic' : 'classic' 
            }
          ]
        ],
        plugins: plugins.length ? plugins : undefined
      }
    }
  }
}