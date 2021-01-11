import { 
    ApolloLink, 
    Operation, 
    NextLink, 
    Observable,
    FetchResult,
    ApolloQueryResult
} from '@apollo/client';

interface Subscriber {
    next?: (value: FetchResult)=> void;
    error?: (error: Error)=> void;
    complete?: () => void;
}

interface Queue {
    forward: NextLink,
    operation: Operation,
    observer?: Observable<FetchResult>
    subscriber?: Subscriber
}

export class QueueOperation {
    
    queues: Queue[]

    constructor() {
        this.queues = []
    }
    
    enqueue(q: Queue) {
        const queue = { ...q };

        queue.observer = queue.observer || 
            new Observable<FetchResult>(observer => {

                if (!queue.subscriber) queue.subscriber = {}; 

                queue.subscriber.next = queue.subscriber.next || observer.next.bind(observer);
                queue.subscriber.complete = queue.subscriber.complete || observer.complete.bind(observer);
                queue.subscriber.error = queue.subscriber.error || observer.error.bind(observer);

                this.queues.push(queue);
            });

        return queue.observer;
    }

    dissolve() {
        this.queues.forEach((queue: Queue) => 
            queue.forward(queue.operation).subscribe(queue.subscriber)
        );

        this.queues = [];
    }
}

type FetchParams = {
    url: RequestInfo,
    params?: RequestInit
}

type LinkArgs = {
    fetchRequest: () => FetchParams
    fetchResponse: (data: ApolloQueryResult<any>) => void
    fetchError: (e: Error) => void
}

export class JWTLink extends ApolloLink {
    
    fetchRequest: () => FetchParams
    fetchResponse: (data: ApolloQueryResult<any>) => void
    fetchError: (e: Error) => void

    queueOperation: QueueOperation;
    fetching: boolean;

    constructor({ 
        fetchRequest, 
        fetchResponse,
        fetchError
    }: LinkArgs) {
        super();

        this.fetching = false;
        this.queueOperation = new QueueOperation();
        this.fetchRequest = fetchRequest;
        this.fetchResponse = fetchResponse;
        this.fetchError = fetchError;
    }

    public request(operation: Operation, forward?: NextLink): Observable<FetchResult> | null {
        if (typeof forward !== 'function')
            throw new Error('[JWT Apollo Link]: JWT Apollo Link is a non-terminating link and should not be the last in the composed chain');

        if (!this.fetching) {
            this.fetching = true;
            
            const fetchParams = this.fetchRequest();

            fetch(fetchParams.url, fetchParams.params)
            .then(data => data.json())
            .then(data => this.fetchResponse(data))
            .catch(e => this.fetchError(e))
            .finally(() => {
                this.fetching = false;
                this.queueOperation.dissolve();
            });
        }

        return this.queueOperation.enqueue({ operation, forward });
    }
}

export default JWTLink;