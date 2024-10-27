"use client"

import { useState } from 'react'

export function useLanguage() {
  const [lang, setLang] = useState('zh')
  return { lang, setLang }
}