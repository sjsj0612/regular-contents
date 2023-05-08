import { useCallback } from 'react';
import { RecoilRoot, SetRecoilState } from 'recoil';
import * as i18n from '../recoil/i18n';

export default function RecoilProvider({
  locale,
  children,
}: {
  locale: string,
  children: JSX.Element,
}) {
  const initializeState = useCallback(({ set }: { set: SetRecoilState }) => {
    set(i18n.locale, locale);
  }, [locale]);

  return (
    <RecoilRoot initializeState={initializeState}>
      {children}
    </RecoilRoot>
  )
}