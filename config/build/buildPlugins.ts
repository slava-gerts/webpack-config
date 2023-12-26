import webpack, { DefinePlugin } from 'webpack'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import {BundleAnalyzerPlugin} from 'webpack-bundle-analyzer'
import ForkIsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import CopyPlugin from 'copy-webpack-plugin'
import path from 'path'

import { BuildOptions } from './types/types'

export function buildPlugins({mode, paths, analyzer, platform}: BuildOptions): webpack.Configuration['plugins'] {
  const isDevelopment = mode === 'development'
  const isProduction = mode === 'production'

  const plugins: webpack.Configuration['plugins'] = [
    new HtmlWebpackPlugin({ template: paths.html, favicon: path.resolve(paths.public, 'favicon_web_print.ico') }),
    new DefinePlugin({
      __PLATFORM__: JSON.stringify(platform),
    }),
    new ForkIsCheckerWebpackPlugin(),
  ]

  if (isDevelopment) {
    plugins.push(
      new webpack.ProgressPlugin(),
      new ReactRefreshWebpackPlugin()
    )
  }

  if (isProduction) {
    plugins.push(
      new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash:8].css',
        chunkFilename: 'css/[name].[contenthash:8].css'
      }),
      new CopyPlugin({
        patterns: [
          {from: path.resolve(paths.public, 'locale'), to: path.resolve(paths.output, 'locale')}
        ]
      })
    )

    if (analyzer) {
      plugins.push(new BundleAnalyzerPlugin())
    }
  }

  return plugins
}