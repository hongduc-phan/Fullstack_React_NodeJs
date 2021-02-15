import React, { createContext, ReactNode, useContext, useMemo, useReducer } from "react";

type ProfileSetupProviderProps = {
  children: ReactNode;
  initialState?: ProfileSetupContextState;
};

export type ProfileSetupContextState = {
  background: string[];
  interests: string[];
  knowtypes: string[];
  profilePictureUrl: string;
  coverImageUrl: string;
  firstname: string;
  lastname: string;
  birthdate: string;
  aboutme: string;
  languages: string[];
  places: string[];
  website: string;
};

type BIK = Pick<ProfileSetupContextState, "background" | "interests" | "knowtypes">;

type PersonalInfo = Pick<
  ProfileSetupContextState,
  | "profilePictureUrl"
  | "coverImageUrl"
  | "firstname"
  | "lastname"
  | "birthdate"
  | "aboutme"
  | "languages"
  | "places"
  | "website"
>;

type Action =
  | {
      type: "BIK";
      payload: BIK;
    }
  | {
      type: "PersonalInfo";
      payload: PersonalInfo;
    };

const defaultState: ProfileSetupContextState = {
  background: [],
  interests: [],
  knowtypes: [],
  profilePictureUrl: "",
  coverImageUrl: "",
  firstname: "",
  lastname: "",
  birthdate: "",
  aboutme: "",
  languages: [],
  places: [],
  website: ""
};

function profileSetupReducer(state: ProfileSetupContextState, action: Action) {
  switch (action.type) {
    case "BIK":
      return {
        ...state,
        ...action.payload
      };
    case "PersonalInfo":
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
}

type ProfileSetupContextType = {
  profileSetupFormState: ProfileSetupContextState;
  dispatch: React.Dispatch<Action>;
};

const ProfileSetupContext = createContext<ProfileSetupContextType | undefined>(undefined);

function ProfileSetupProvider({ children, initialState = defaultState }: ProfileSetupProviderProps) {
  // TODO: add form validation before making API call
  const [profileSetupFormState, dispatch] = useReducer(profileSetupReducer, initialState);

  const contextValue = useMemo(() => {
    return { profileSetupFormState, dispatch };
  }, [profileSetupFormState]);

  return <ProfileSetupContext.Provider value={contextValue}>{children}</ProfileSetupContext.Provider>;
}

ProfileSetupContext.displayName = "ProfileSetupContext";

function useProfileSetupStore() {
  const context = useContext(ProfileSetupContext);
  if (context === undefined) {
    throw new Error("useProfileSetupStore must be used within a ProfileSetupContext Provider");
  }
  return context;
}

export { ProfileSetupProvider, useProfileSetupStore };
