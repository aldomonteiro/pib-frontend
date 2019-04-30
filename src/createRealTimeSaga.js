import realtimeSaga from "ra-realtime";

const observeRequest = dataProvider => (type, resource, params) => {
    // Filtering so that only orders are updated in real time
    if (resource !== 'orders' || type !== "GET_LIST") return;

    // Use your apollo client methods here or sockets or whatever else 
    // including the following very naive polling mechanism
    return {
        subscribe (observer) {
            let intervalId = setInterval(() => {
                dataProvider(type, resource, params)
                    .then(results => observer.next(results)) // New data received, notify the observer
                    .catch(error => observer.error(error)); // Ouch, an error occured, notify the observer
            }, 5000);

            let subscription = {
                unsubscribe () {
                    // Clean up after ourselves
                    clearInterval(intervalId);
                    intervalId = undefined;
                    // Notify the saga that we cleaned up everything
                    observer.complete();
                }
            };

            return subscription;
        }
    };
};

export default dataProvider => realtimeSaga(observeRequest(dataProvider));
