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

      // 🆕 추가된 규칙들
      // React에서 이스케이프되지 않은 엔티티 허용 (매뉴얼 문서에서 특수문자 사용)
      'react/no-unescaped-entities': 'off',

      // 또는 특정 문자만 허용하려면:
      // 'react/no-unescaped-entities': [
      //   'error',
      //   {
      //     forbid: ['>', '}']  // 이 문자들만 금지, 따옴표/아포스트로피는 허용
      //   }
      // ],
    },
  },

  // 🆕 특정 파일/폴더에 대한 추가 규칙 완화
  {
    files: ['**/manual/**/*.tsx', '**/manual/**/*.ts'],
    rules: {
      // 매뉴얼 페이지에서는 import된 컴포넌트를 사용하지 않을 수도 있음
      '@typescript-eslint/no-unused-vars': 'off',
      // 매뉴얼에서 특수문자 완전 허용
      'react/no-unescaped-entities': 'off',
    },
  },
]