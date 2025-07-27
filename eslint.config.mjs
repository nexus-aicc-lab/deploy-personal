// .eslintrc.cjs (Flat config)
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({ baseDirectory: __dirname })

export default [
  // Next.js 기본 확장
  ...compat.extends('next/core-web-vitals', 'next/typescript'),

  // 커스텀 룰 완화
  {
    rules: {
      // any 허용
      '@typescript-eslint/no-explicit-any': 'off',
      // 빈 인터페이스 허용
      '@typescript-eslint/no-empty-interface': 'off',
      // 빈 object 타입({}) 선언도 허용
      '@typescript-eslint/no-empty-object-type': 'off',
      // _ 로 시작하거나 props 이름은 unused-vars 제외
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_.*|^props$',
          varsIgnorePattern: '^_',
        },
      ],
    },
  },
]
