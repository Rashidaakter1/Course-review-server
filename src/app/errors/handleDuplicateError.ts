const handleDuplicateError = (err: any) => {
  // Extract value within double quotes using regex
  const match = err.message.match(/"([^"]*)"/);

  // The extracted value will be in the first capturing group
  const extractedMessage = match && match[1];
  const errorSources = [
    {
      path: "",
      message: `${extractedMessage} is already exist`,
    },
  ];

  return {
    message: "Duplicate Entry",
    errorMessage: "Duplicate",
  };
};

export default handleDuplicateError;
