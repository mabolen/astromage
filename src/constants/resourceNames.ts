// Types
import { ResourceMap, ResProdMap } from "../types"

export const resNames = ['material', 'energy', 'ammo'] as const

export const resProds = ['materialProd', 'energyProd', 'ammoProd']

export const resProdMap: ResProdMap = {
    materialProd: 'material',
    energyProd: 'energy',
    ammoProd: 'ammo',
} as const

export const resMap: ResourceMap = {
  defense: 'material',
  power: 'energy',
  offense: 'ammo',
} as const

export const prodTypeMap = {
  defense: 'materialProd',
  power: 'energyProd',
  offense: 'ammoProd',
} as const

export const allStatusNames = [
  'health',
  'hull',
  'material',
  'energy',
  'ammo',
  'materialProd',
  'energyProd',
  'ammoProd',
] as const

export const resNameAllMap = {
  material: ['material', 'materialProd'],
  energy: ['energy', 'energyProd'],
  ammo: ['ammo', 'ammoProd'],
} as const

export type ResNameType = 'material' | 'energy' | 'ammo'
