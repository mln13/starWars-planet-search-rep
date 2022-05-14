const apiRequest = async (link) => {
  try {
    const response = await fetch(link);
    const data = await response.json();
    return data.count;
  } catch (error) {
    console.log(error);
  }
};

export default apiRequest;
