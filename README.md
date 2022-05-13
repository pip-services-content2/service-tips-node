# Tips Microservice

This is a user tips microservice from Pip.Services library. 
It shows useful tips to users that help them use application more effectively.
Each tip:
- Can be written in multiple languages
- Can include pictures and document attachments
- Supports editing lifecycle via status tracking

The microservice currently supports the following deployment options:
* Deployment platforms: Standalone Process
* External APIs: HTTP/REST, AWS Lambda
* Persistence: In-Memory, Flat Files, MongoDB

This microservice has dependencies on the following microservices:
- [pip-services-attachments](https://github.com/pip-services-content2/pip-services-attachments-node) - to reference pictures and documents associates with tips

<a name="links"></a> Quick Links:

* [Download Links](doc/Downloads.md)
* [Development Guide](doc/Development.md)
* [Configuration Guide](doc/Configuration.md)
* [Deployment Guide](doc/Deployment.md)
* Client SDKs
  - [Node.js SDK](https://github.com/pip-services-content2/client-tips-node)
* Communication Protocols
  - [HTTP Version 1](doc/HttpProtocolV1.md)

##  Contract

Logical contract of the microservice is presented below. For physical implementation (HTTP/REST, Thrift, Lambda, etc.),
please, refer to documentation of the specific protocol.

```typescript
class TipV1 implements IStringIdentifiable {
    /* Identification */
    public id: string;
    public topics: string[];

    /* Automatically managed fields */
    public creator: PartyReferenceV1;
    public create_time: Date;

    /* Content */
    public title?: MultiString;
    public content?: MultiString;
    public more_url?: string;
    public pics?: AttachmentV1[];
    public docs?: AttachmentV1[];

    /* Search */
    public tags?: string[];
    public all_tags?: string[];

    /* Status */
    public status?: string;

    /* Custom fields */
    public custom_hdr?: any;
    public custom_dat?: any;
}

class AttachmentV1 {
    public id?: string;
    public uri?: string;
    public name?: string;
}

class PartyReferenceV1 {
    public id: string;
    public name?: string;
    public email?: string;
}

class TipStatusV1 {
    public static readonly New = "new";
    public static readonly Writing = "writing";
    public static readonly Translating = "translating";
    public static readonly Verifying = "verifying";
    public static readonly Completed = "completed";
}

interface ITipsV1 {
    getTips(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<TipV1>>;

    getRandomTip(correlationId: string, filter: FilterParams): Promise<TipV1>;

    getTipById(correlationId: string, tipId: string): Promise<TipV1>;

    createTip(correlationId: string, tip: TipV1): Promise<TipV1>;

    updateTip(correlationId: string, tip: TipV1): Promise<TipV1>;

    deleteTipById(correlationId: string, tipId: string): Promise<TipV1>;
}
```

## Download

Right now the only way to get the microservice is to check it out directly from github repository
```bash
git clone git@github.com:pip-services-content2/service-tips-node.git
```

Pip.Service team is working to implement packaging and make stable releases available for your 
as zip downloadable archieves.

## Run

Add **config.yaml** file to the root of the microservice folder and set configuration parameters.
As the starting point you can use example configuration from **config.example.yaml** file. 

Example of microservice configuration
```yaml
---
- descriptor: "pip-services:logger:console:default:1.0"
  level: "trace"

- descriptor: "service-tips:persistence:file:default:1.0"
  path: "./data/tips.json"

- descriptor: "service-tips:controller:default:default:1.0"

- descriptor: "pip-services-attachments:client:http:default:1.0"
  connection:
    protocol: "http"
    host: "0.0.0.0"
    port: 8082

- descriptor: "service-tips:service:http:default:1.0"
  connection:
    protocol: "http"
    host: "0.0.0.0"
    port: 8080
```
 
For more information on the microservice configuration see [Configuration Guide](Configuration.md).

Start the microservice using the command:
```bash
node run
```

## Use

The easiest way to work with the microservice is to use client SDK. 
The complete list of available client SDKs for different languages is listed in the [Quick Links](#links)

If you use Node.js then you should add dependency to the client SDK into **package.json** file of your project
```javascript
{
    ...
    "dependencies": {
        ....
        "client-tips-node": "^1.0.*",
        ...
    }
}
```

Inside your code get the reference to the client SDK
```javascript
let sdk = new require('client-tips-node');
```

Define client configuration parameters that match configuration of the microservice external API
```javascript
// Client configuration
let config = {
    connection: {
        protocol: 'http',
        host: 'localhost', 
        port: 8080
    }
};
```

Instantiate the client and open connection to the microservice
```javascript
// Create the client instance
let client = sdk.TipsHttpClientV1(config);

// Connect to the microservice
try {
    await client.open(null);
    // Work with the microservice
    ...
} catch(err) {
    console.error('Connection to the microservice failed');
    console.error(err);
}
```

Now the client is ready to perform operations
```javascript
// Create a new tip
let tip = await client.createTip(
    null,
    { 
        topics: ['ui'],
        title: { en: 'Context help' },
        content: { en: 'Press Ctrl-F1 to get context help' }
    }
);
```

```javascript
// Get a random tip
let tip = await client.getRandomTip(
    null,
    {}
);
```    

## Acknowledgements

This microservice was created and currently maintained by *Sergey Seroukhov*.

