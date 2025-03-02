import { pathsToModuleNameMapper } from 'ts-jest'
import tsconfig from './tsconfig.json' assert { type: 'json' }

/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
    preset: 'ts-jest',
    testEnvironment: 'node',
    clearMocks: true,
    moduleFileExtensions: ['ts', 'js'],
    testMatch: ['**/__tests__/**/*.test.ts'],
    transform: {
        '^.+\\.ts$': 'ts-jest'
    },
    moduleNameMapper: pathsToModuleNameMapper(tsconfig.compilerOptions.paths, {
        prefix: '<rootDir>/'
    })
}
