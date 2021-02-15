export type ActivityTabsType =
  | "Drafts"
  | "Ignites donated"
  | "Ignites received"
  | "Interacting"
  | "Sparkons donated"
  | "Sparkons received"
  | "Sparks created";

export type CreateSparkSparkOnFormState = {
  title: string;
  main: string;
  elaboration: string;
};

export type SparkFormStateType = {
  isValid: boolean;
  values: {
    title: string;
    main: string;
    elaboration: string;
  };
  touched: {
    title: boolean;
    main: boolean;
    elaboration: boolean;
  };
  focused: {
    title: boolean;
    main: boolean;
    elaboration: boolean;
  };
  errors: {
    title: string[];
    main: string[];
    elaboration: string[];
  };
};

export type IgnitesChips =
  | "anthropology"
  | "art"
  | "biology"
  | "culture"
  | "curiosity"
  | "strategy"
  | "study"
  | "technology";

export type IgniteCategories = "gutfeel" | "knowtypes" | "human" | "time" | "relevance" | "agreement" | "writing style";

export type IgniteSubCategories =
  | "human context"
  | "human systems"
  | "relevance to humanity"
  | "relevance to me"
  | "relevance to some"
  | "future"
  | "enduring"
  | "change";

export type RouteParams = {
  sparkmapId?: string;
  sparkId?: string;
  resetId?: string;
};
