import webpack from 'webpack'
import { BuildOptions } from './types/types'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import ReactRefreshTypescript from 'react-refresh-typescript'

import {buildBabelLoader} from './babel/buildBabelLoader'

export function buildLoaders(options: BuildOptions): webpack.ModuleOptions['rules'] {
  const {mode} = options
  const isDevelopment = mode === 'development'

  const tsLoader = {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: [
      {
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
          getCustomTransformers: () => ({
            before: [isDevelopment && ReactRefreshTypescript()].filter(Boolean)
          })
        }
      }
    ]
  }

  const cssLoaderWithModules = {
    loader: 'css-loader',
    options: {
      modules: {
        localIdentName: isDevelopment ? '[path][name]__[local]' : '[hash:base64:8]'
      }
    }
  }

  const scssLoader = {
    test: /\.s[ca]ss$/i,
    use: [
      isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader, 
      cssLoaderWithModules, 
      'sass-loader'
    ]
  }

  const assetLoader = {
    test: /\.(png|jpg|jpeg|gif)$/i,
    type: 'asset/resource',
  }

  const svgrLoader = {
    test: /\.svg$/,
    use: [
      {
        loader: '@svgr/webpack',
        options: {
          icon: true,
        }
      }
    ],
  }

  const babelLoader = buildBabelLoader(options)

  return [
    scssLoader,
    //tsLoader,
    babelLoader,
    assetLoader,
    svgrLoader,
  ]
}