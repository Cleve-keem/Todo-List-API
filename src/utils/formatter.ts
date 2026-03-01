export const formatUserRegistrationValidationError = (error: any) => {
  const errorMessages = error.issues.reduce(
    (acc: any, issue: any) => {
      const path: any = issue.path[0];
      acc[path] = issue.message;
      return acc;
    },
    {} as Record<string, string>,
  );
  return errorMessages;
};

export const formatUserLoginValidationError = (error: any) => {
  const errorMessage = error.issues.reduce((acc: any, issue: any) => {
    const path = issue.path[0];
    acc[path] = issue.message;
    return acc;
  });

  return errorMessage;
};

export const formatTodoError = (error: any) => {
  const errorMessage = error.issues.reduce((acc: any, issue: any) => {
    const path = issue.path[0];
    acc[path] = issue.message;
    return acc;
  }, {});

  return errorMessage;
};
