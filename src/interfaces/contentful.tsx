interface ContentfulLink<T extends string> {
  sys: {
    type: "Link";
    linkType: T;
    id: string;
  };
}

interface AssetFile {
  url: string;
  details: {
    size: number;
    image?: {
      width: number;
      height: number;
    };
  };
  fileName: string;
  contentType: string;
}

interface Metadata {
  tags: string[];
  concepts: unknown[];
}

interface BaseSys {
  id: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  revision: number;
  locale: string;
  space: ContentfulLink<"Space">;
  environment: ContentfulLink<"Environment">;
  publishedVersion: number;
}

export interface Asset {
  metadata: Metadata;
  sys: BaseSys & {
    type: "Asset";
  };
  fields: {
    title: string;
    description: string;
    file: AssetFile;
  };
}

export interface EventFields {
  eventName: string;
  clubName: string;
  eventType: string;
  poster: ContentfulLink<"Asset">;
  startDateAndTime: string;
  endDateAndTime: string;
  pricePerPerson: number;
  participationType: string;
  maxParticipants: number;
  eventVenue: string;
  shortDescription: string;
  longDescription: string;
  rules: string[];
  judgementCriteria: string[];
  tags: string[];
  specialEvent: boolean;
}

export interface EventItem {
  metadata: Metadata;
  sys: BaseSys & {
    type: "Entry";
    contentType: ContentfulLink<"ContentType">;
  };
  fields: EventFields;
}

export interface IncludedEntry {
  metadata: Metadata;
  sys: BaseSys & {
    type: "Entry";
    contentType: ContentfulLink<"ContentType">;
  };
  fields: Record<string, unknown>;
}

export interface ContentfulCollectionResponse<T> {
  sys: {
    type: "Array";
  };
  total: number;
  skip: number;
  limit: number;
  items: T[];
  includes?: {
    Asset?: Asset[];
    Entry?: IncludedEntry[];
  };
}

export type EventApiResponse = ContentfulCollectionResponse<EventItem>;
