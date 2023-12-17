import { defineConfig } from "@sanity-typed/types";
import type { InferSchemaValues } from "@sanity-typed/types";
import { picture } from './sanity-schemas/picture';
import { picture_section } from './sanity-schemas/picture_section';
import { preview } from './sanity-schemas/preview';
import { project } from './sanity-schemas/project';
import { quote } from './sanity-schemas/quote';
import { section } from './sanity-schemas/section';
import { three_cols } from './sanity-schemas/three_cols';
import { website } from './sanity-schemas/website';

const config = defineConfig({
  name: 'default',
  title: 'Amy Jackson Portfolio',

  projectId: 'qyyz7qna',
  dataset: 'production',

  schema: {
    types: [
			picture,
			picture_section,
			preview,
			project,
			quote,
			section,
			three_cols,
			website
		],
  },
})

type SanityValues = InferSchemaValues<typeof config>;

export type Project = SanityValues["project"]
export type Picture = SanityValues["picture"]
export type PictureSectionType = SanityValues["picture_section"]
export type Preview = SanityValues["preview"]
export type QuoteType = SanityValues["quote"]
export type SectionType = SanityValues["section"]
export type ThreeCols = SanityValues["three_cols"]
export type Website = SanityValues["website"]




