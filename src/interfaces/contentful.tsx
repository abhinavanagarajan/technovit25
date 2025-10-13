interface ContentfulLink {
  sys: {
    type: "Link";
    linkType: string;
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

export interface Asset {
  metadata: {
    tags: string[];
    concepts: any[];
  };
  sys: {
    id: string;
    type: "Asset";
    createdAt: string;
    updatedAt: string;
    locale: string;
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
  poster: ContentfulLink;
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
  metadata: {
    tags: string[];
    concepts: any[];
  };
  sys: {
    id: string;
    type: "Entry";
    createdAt: string;
    updatedAt: string;
  };
  fields: EventFields;
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
    Entry?: any[];
  };
}

export type EventApiResponse = ContentfulCollectionResponse<EventItem>;
