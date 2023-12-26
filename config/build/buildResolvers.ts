import webpack from 'webpack'
import { BuildOptions } from './types/types'
import path from 'path'

export function buildResolvers(options: BuildOptions): webpack.Configuration['resolve'] {
  return {
    extensions: ['.tsx', '.ts', '.js'],
    modules: [options.paths.src, 'node_modules'],
  }
}