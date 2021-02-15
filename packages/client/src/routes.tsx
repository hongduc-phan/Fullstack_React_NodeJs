import { makeStyles } from "@material-ui/core/styles";
import { CenteredComponent } from "components";
import {
  ProfileSetupLayout,
  RegistrationLayout,
  ResetPasswordLayout,
  SparkFormLayout,
  SparkmapLayout,
  TermsLayout
} from "layouts";
import SearchLayout from "layouts/Search";
import React, { lazy } from "react";
import { Redirect } from "react-router-dom";

const useStyles = makeStyles(() => ({
  insights: {
    borderLeft: "1px solid grey"
  }
}));

const InsightsPage = () => {
  const classes = useStyles();
  return <CenteredComponent className={classes.insights}>Insights page sidebar</CenteredComponent>;
};

const CodeofConductView = lazy(() => import("components/TermsComponents/CodeofConduct"));

const routes: object[] = [
  {
    path: "/profile-setup",
    component: ProfileSetupLayout,
    routes: [
      {
        path: "/profile-setup",
        exact: true,
        component: lazy(() => import("views/ProfileSetupWelcome"))
      },
      {
        path: "/profile-setup/start",
        exact: true,
        component: lazy(() => import("views/ProfileSetup"))
      }
    ]
  },

  {
    path: "/auth",
    component: RegistrationLayout,
    routes: [
      {
        path: "/auth/login",
        exact: true,
        component: lazy(() => import("views/Login"))
      }
    ]
  },

  {
    path: "/registration",
    component: RegistrationLayout,
    routes: [
      {
        path: "/registration/1",
        exact: true,
        component: lazy(() => import("views/Registration/Register"))
      },
      {
        path: "/registration/2",
        exact: true,
        component: lazy(() => import("views/Registration/ResponseMatters"))
      },
      {
        path: "/registration/3",
        exact: true,
        component: lazy(() => import("views/Registration/LegalView"))
      },
      {
        path: "/registration/4",
        exact: true,
        component: lazy(() => import("views/Registration/CodeofConductView"))
      },
      {
        path: "/registration/5",
        exact: true,
        component: lazy(() => import("views/Registration/EmailConfirmation"))
      },
      {
        path: "/registration/6",
        exact: true,
        component: lazy(() => import("views/Registration/Finish"))
      },
      {
        path: "/registration",
        exact: true,
        component: () => <Redirect to="/registration/1" />
      }
    ]
  },

  {
    path: "/resetPassword",
    component: ResetPasswordLayout,
    routes: [
      {
        path: "/resetPassword/provideEmail",
        exact: true,
        component: lazy(() => import("views/ResetPassword/ProvideEmail"))
      },
      {
        path: "/resetPassword/resetSent",
        exact: true,
        component: lazy(() => import("views/ResetPassword/ResetSent"))
      },
      {
        path: "/resetPassword/setNewPassword/:resetId",
        exact: true,
        component: lazy(() => import("views/ResetPassword/SetNewPassword"))
      },
      {
        path: "/resetPassword",
        exact: true,
        component: () => <Redirect to="/resetPassword/provideEmail" />
      }
    ]
  },

  {
    path: "/search",
    component: SearchLayout,
    routes: [
      {
        path: "/search",
        exact: true,
        component: lazy(() => import("views/Search"))
      },
      {
        path: "/search/results",
        exact: true,
        component: lazy(() => import("views/Search"))
      }
    ],

    orbitRoutes: [
      {
        path: "/search",
        exact: true,
        component: lazy(() => import("views/SparkMapOrbit/DefaultOrbit"))
      },
      {
        path: "/search/results",
        exact: true,
        component: lazy(() => import("views/SparkMapOrbit/DefaultOrbit"))
      }
    ]
  },

  {
    path: "/create-spark/newspark",
    component: SparkFormLayout,
    routes: [
      {
        path: "/create-spark/newspark",
        exact: true,
        component: lazy(() => import("views/Spark/CreateSpark/CreateNewSpark"))
      },
      {
        path: "/create-spark/draft-spark/:sparkId",
        exact: true,
        component: lazy(() => import("views/Spark/CreateSpark/EditDraftSpark"))
      }
    ]
  },

  {
    path: "/terms",
    component: TermsLayout,
    routes: [
      {
        path: "/terms",
        exact: true,
        component: lazy(() => import("components/TermsComponents/Terms"))
      },
      {
        path: "/terms/privacy-policy",
        exact: true,
        component: lazy(() => import("components/TermsComponents/PrivacyPolicy"))
      },
      {
        path: "/terms/code-of-conduct",
        exact: true,
        component: () => <CodeofConductView disableActions />
      },
      {
        path: "/terms/cookies-policy",
        exact: true,
        component: lazy(() => import("components/TermsComponents/CookiesPolicy"))
      },
      {
        path: "*",
        exact: true,
        component: () => <Redirect to="/terms" />
      }
    ]
  },

  {
    path: "/profile",
    component: SparkmapLayout,
    orbitRoutes: [
      {
        path: "*",
        exact: true,
        component: lazy(() => import("views/SparkMapOrbit/DefaultOrbit"))
      }
    ],
    routes: [
      {
        path: "/profile/me",
        exact: true,
        component: lazy(() => import("views/Profile/PrivateProfile/PrivateProfileHome"))
      },
      {
        path: "/profile/editprofile",
        exact: true,
        component: lazy(() => import("views/Profile/PrivateProfile/EditProfile"))
      },
      {
        path: "/profile/settings",
        exact: true,
        component: lazy(() => import("views/Profile/PrivateProfile/Settings"))
      },
      {
        path: "/profile/:memberId",
        exact: true,
        component: lazy(() => import("views/Profile/PublicProfile"))
      }
    ]
  },

  {
    path: "/sparkmap",
    component: SparkmapLayout,
    orbitRoutes: [
      {
        path: "/sparkmap/sparkon/:sparkId",
        exact: true,
        component: lazy(() => import("views/SparkMapOrbit/SparkOnsOrbit"))
      },
      {
        path: "/sparkmap/sparkons-orbit/:sparkId",
        exact: true,
        component: lazy(() => import("views/SparkMapOrbit/SparkOnsOrbit"))
      },
      {
        path: "/sparkmap/view-spark/:sparkId",
        exact: true,
        component: lazy(() => import("views/SparkMapOrbit/SparkOnsOrbit"))
      },
      {
        path: "/sparkmap/view-spark/:sparkId/ignite-on-spark",
        exact: true,
        component: lazy(() => import("views/SparkMapOrbit/SparkOnsOrbit"))
      },
      {
        path: "/sparkmap/sparkonslist/:sparkId",
        exact: true,
        component: lazy(() => import("views/SparkMapOrbit/SparkOnsOrbit"))
      },
      {
        path: "*",
        exact: true,
        component: lazy(() => import("views/SparkMapOrbit/DefaultOrbit"))
      }
    ],
    routes: [
      {
        path: "/sparkmap/sparkon/:sparkId",
        exact: true,
        component: lazy(() => import("views/SparkOn/CreateSparkOn"))
      },
      {
        path: "/sparkmap/view-spark/:sparkId",
        exact: true,
        component: lazy(() => import("views/Spark/ViewSpark"))
      },
      {
        path: "/sparkmap/view-spark/:sparkId/ignite-on-spark",
        exact: true,
        component: lazy(() => import("views/IgniteSelection"))
      },
      {
        path: "/sparkmap/sparkonslist/:sparkId",
        exact: true,
        component: lazy(() => import("views/SparkOn/SparkOnsList"))
      },
      {
        path: "/sparkmap/sparkons-orbit/:sparkId",
        exact: true,
        component: InsightsPage
      },
      {
        path: "/sparkmap",
        exact: true,
        component: InsightsPage
      },
      {
        path: "*",
        exact: true,
        component: () => <Redirect to="/sparkmap" />
      }
    ]
  },

  {
    path: "/",
    component: RegistrationLayout,
    routes: [
      {
        path: "/",
        exact: true,
        component: lazy(() => import("views/Welcome"))
      }
    ]
  }
];

export default routes;
