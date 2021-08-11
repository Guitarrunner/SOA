

const postData = async (data, URL) => {
    const response = await fetch(URL,
        {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

    return response.json

    }

export default postData;