import { useCallback, useState } from "react";
import vest from "vest";

type Props<T> = {
  initialFormState: T;
  validateFn: any;
  suiteName: string;
  groupName?: string;
};

export type UseFormState<T> = {
  values: T;
  focused: {
    [P in keyof T]?: boolean;
  };
  dirty: {
    [P in keyof T]?: boolean;
  };
  touched: {
    [P in keyof T]?: boolean;
  };
};

const useForm = <T>({ initialFormState, validateFn, suiteName, groupName }: Props<T>) => {
  const [formState, setFormState] = useState<UseFormState<T>>({
    values: initialFormState,
    dirty: {},
    focused: {},
    touched: {}
  });
  const [validationResult, setValidationResult] = useState(vest.get(suiteName));

  const getNextFormState = useCallback(
    (fieldName, fieldValue) => {
      const nextFormState = {
        ...formState,
        values: {
          ...formState.values,
          [fieldName]: fieldValue
        },
        dirty: {
          ...formState.dirty,
          [fieldName]: true
        },
        touched: {
          ...formState.touched,
          [fieldName]: true
        }
      };

      return nextFormState;
    },
    [formState]
  );

  const onChange = useCallback(
    ({ target: { name, value } }) => {
      const nextFormState = getNextFormState(name, value);
      setFormState(nextFormState);
      setValidationResult(validateFn(nextFormState.values, { currentField: name, groupName }));
    },
    [getNextFormState, validateFn, groupName]
  );

  const onFieldChange = useCallback(
    (fieldName: keyof T, fieldValue: any) => {
      const nextFormState = getNextFormState(fieldName, fieldValue);
      setFormState(nextFormState);
      setValidationResult(validateFn(nextFormState.values, { currentField: fieldName, groupName }));
    },
    [getNextFormState, validateFn, groupName]
  );

  const onFocus = useCallback(({ target: { name } }) => {
    setFormState((formState: any) => ({
      ...formState,
      focused: {
        ...formState.focused,
        [name]: true
      }
    }));
  }, []);

  const onBlur = useCallback(({ target: { name } }) => {
    setFormState((formState: any) => ({
      ...formState,
      focused: {
        ...formState.focused,
        [name]: false
      }
    }));
  }, []);

  const runValidate = useCallback(() => {
    const validationRes = validateFn(formState.values, { currentField: "", groupName });

    setValidationResult(validationRes);

    const isValid = groupName ? !validationRes.hasErrorsByGroup(groupName) : !validationRes.hasErrors();

    return isValid;
  }, [formState.values, groupName, validateFn]);

  const resetForm = useCallback(() => {
    setFormState({ values: initialFormState, dirty: {}, focused: {}, touched: {} });
  }, [initialFormState]);

  return { onBlur, onChange, onFieldChange, onFocus, resetForm, formState, validationResult, runValidate };
};

export default useForm;
