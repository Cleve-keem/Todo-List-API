export const formatValidationError = (error: any) => {
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
