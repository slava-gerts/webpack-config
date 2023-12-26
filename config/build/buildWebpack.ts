import webpack from 'webpack'
import type {Configuration as DevServerConfiguration} from 'webpack-dev-server'

import {buildDevServer} from './buildDevServer'
import {buildLoaders} from './buildLoaders'
import {buildPlugins} from './buildPlugins'
import {buildResolvers} from './buildResolvers'
import { BuildOptions } from './types/types'

export function buildWebpack(options: BuildOptions): webpack.Configuration {
  const {mode, paths} = options
  const isDevelopment = mode === 'development'

  return {
    mode: mode ?? 'development',
    entry: paths.entry,
    output: {
      path: paths.output,
      filename: '[name].[contenthash].js',
      clean: true,
    },
    plugins: buildPlugins(options),
    module: {
      rules: buildLoaders(options),
    },
    resolve: buildResolvers(options),
    ...(isDevelopment ? {
      devtool: 'inline-source-map',
      devServer: buildDevServer(options)
    } : {})
  }
}