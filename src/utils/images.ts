import { config } from 'src/config';
import { ImageResponseOptions } from 'next/server';

/**
 * Helper function for loading the brand fonts for images
 */
export async function getBrandFonts(): Promise<ImageResponseOptions['fonts']> {
  const [
    // comment for better diffs
    brandBold,
    brandMedium,
  ] = await Promise.all([
    fetch(config.siteUrl + new URL('../fonts/diatype/ABCDiatype-Bold.woff', import.meta.url)).then(
      (res) => res.arrayBuffer()
    ),
    fetch(
      config.siteUrl + new URL('../fonts/diatype/ABCDiatype-Medium.woff', import.meta.url)
    ).then((res) => res.arrayBuffer()),
  ]);

  return [
    {
      name: 'Diatype',
      data: brandMedium,
      style: 'normal',
      weight: 500,
    },
    {
      name: 'Diatype',
      data: brandBold,
      style: 'normal',
      weight: 700,
    },
  ];
}
