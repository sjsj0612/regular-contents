
'use client';
import { atom } from 'recoil';

export const locale = atom({
  key: 'locale',
  default: 'en-us',
});