import { Breadcrumbs, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { NavigateNext as NavigateNextIcon } from "@material-ui/icons";
import clsx from "clsx";
import React, { useCallback } from "react";
import ExploringPathItem from "./ExploringPathItem";
import { BreadcrumbItem } from "./types";

type ExploringPathProps = {
  className?: string;
  // TODO: remove optionalibility as its essential to pass this in order to render
  pathItems?: BreadcrumbItem[];
};

// TODO: this is temporary; Remove once exploring path data is being passed from sparkmap orbit
const dummyExploringPathData: BreadcrumbItem[] = [
  {
    avatar:
      "https://images.unsplash.com/photo-1563970163896-1bdc26b47b4a?ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80",
    sparkTitle: "First djflkdjfldjf djfkljd jflkdjfkl",
    sparkUrl:
      "https://images.unsplash.com/photo-1563970163896-1bdc26b47b4a?ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80"
  },
  {
    avatar:
      "https://images.unsplash.com/photo-1568214883035-dcb12ece125e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=701&q=80",
    sparkTitle: "Second dj kljdfkjdklfjdklfjdlkfjdlj",
    sparkUrl:
      "https://images.unsplash.com/photo-1563970163896-1bdc26b47b4a?ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80"
  },
  {
    avatar:
      "https://images.unsplash.com/photo-1568214883035-dcb12ece125e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=701&q=80",
    sparkTitle: "Third dj kljdfkjdklfjdklfjdlkfjdlj",
    sparkUrl:
      "https://images.unsplash.com/photo-1563970163896-1bdc26b47b4a?ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80"
  },
  {
    avatar:
      "https://images.unsplash.com/photo-1568131321398-cf94f71ec3ad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=687&q=80",
    sparkTitle: "Fourth item and some hjkhkhkjkhk hjkh",
    sparkUrl:
      "https://images.unsplash.com/photo-1563970163896-1bdc26b47b4a?ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80"
  },
  {
    avatar:
      "https://images.unsplash.com/photo-1568166889030-5f7e811b709a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
    sparkTitle: "Fifth dfjdf djflkjd jdfkljdlf djfdkj djflkj jdfkl",
    sparkUrl:
      "https://images.unsplash.com/photo-1563970163896-1bdc26b47b4a?ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80"
  },
  {
    avatar:
      "https://images.unsplash.com/photo-1568166889030-5f7e811b709a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
    sparkTitle:
      "Sixth djfdj jdlfldkjf some thing jkdl jdkljj dflkj jdfkljdjf kljldj fljdlf jjdlkf jjdf lkjldjf lkjdl jflkj",
    sparkUrl:
      "https://images.unsplash.com/photo-1563970163896-1bdc26b47b4a?ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80"
  },
  {
    avatar:
      "https://images.unsplash.com/photo-1568166889030-5f7e811b709a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
    sparkTitle:
      "Seventh djfdj jdlfldkjf some thing jkdl jdkljj dflkj jdfkljdjf kljldj fljdlf jjdlkf jjdf lkjldjf lkjdl jflkj",
    sparkUrl:
      "https://images.unsplash.com/photo-1563970163896-1bdc26b47b4a?ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80"
  }
];

const FirstItemStyle = {
  "&:first-child": {
    width: 70
  }
};

const SecondItemStyle = {
  "&:nth-child(3)": {
    width: 70
  }
};

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 520,
    maxWidth: 800,
    padding: theme.spacing(1, 2)
  },
  paper: {
    padding: theme.spacing(1, 2)
  },
  li: {
    width: 225
  },
  minimizedFirstItem: {
    ...FirstItemStyle
  },

  minimizedFirstTwoItems: {
    ...FirstItemStyle,
    ...SecondItemStyle
  }
}));

const ExploringPath = ({ className, pathItems = dummyExploringPathData }: ExploringPathProps) => {
  const count = pathItems.length;
  const lastItemIndex = count - 1;
  const classes = useStyles(count);

  const classesForList = () => {
    if (count > 3) {
      return classes.minimizedFirstTwoItems;
    }

    if (count === 3) {
      return classes.minimizedFirstItem;
    }
  };

  const handleClick = useCallback((title: string) => {
    alert(`Breadcrumb with title: ${title}`);
  }, []);

  return (
    <Paper elevation={1} className={clsx(classes.root, className)}>
      <Breadcrumbs
        maxItems={4}
        itemsAfterCollapse={2}
        itemsBeforeCollapse={2}
        aria-label="breadcrumb"
        separator={<NavigateNextIcon fontSize="small" />}
        classes={{
          li: clsx(classes.li, classesForList())
        }}
      >
        {pathItems.map(({ sparkTitle, avatar, sparkUrl }, idx) => (
          <ExploringPathItem
            key={sparkTitle}
            isActive={idx === lastItemIndex}
            handleClick={handleClick}
            avatar={avatar}
            sparkTitle={sparkTitle}
            sparkUrl={sparkUrl}
          />
        ))}
      </Breadcrumbs>
    </Paper>
  );
};

export default React.memo(ExploringPath);
