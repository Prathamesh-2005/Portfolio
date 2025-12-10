import Script from 'next/script';
import React from 'react';

export function CursorCat() {
  return <Script src="/oneko.js" data-cat="/oneko.gif" />;
}
