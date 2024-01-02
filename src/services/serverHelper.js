
export const makeUnauthenticatedPOSTRequest = async (route, body) => {

  try {
    const {username , password} = body;
    const response = await fetch(route, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      // the body will send like this to backend
      body: JSON.stringify({username , password}),
    });

    const formattedResponse = await response.json();
    return formattedResponse;
  } catch (error) {
    console.log(`error in fetch api `, error);
  }
};


