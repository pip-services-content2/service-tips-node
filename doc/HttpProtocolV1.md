# HTTP REST Protocol (version 1) <br/> Tips Microservice

Tips microservice implements a HTTP compatible API, that can be accessed on configured port.
All input and output data is serialized in JSON format. Errors are returned in [standard format]().

* [AttachmentV1 class](#class1)
* [PartyRefereneceV1 class](#class2)
* [TipV1 class](#class4)
* [POST /tips/get_announcemets](#operation1)
* [POST /tips/get_random_tip](#operation2)
* [POST /tips/get_tip_by_id](#operation3)
* [POST /tips/create_tip](#operation4)
* [POST /tips/update_tips](#operation5)
* [POST /tips/delete_tips_by_id](#operation6)

## Data types

### <a name="class1"></a> AttachmentV1 class

Contains reference to a document attachment

**Properties:**
- id: string - unique feedback id
- name: string - document (file) name

### <a name="class2"></a> PartyReferenceV1 class

Contains reference to sending or replying party

**Properties:**
- id: string - unique feedback id
- name: string - party name
- email: string - (optional) party email address (optional)

### <a name="class3"></a> LocationV1 class

Contains location on a map

**Properties:**
- name: string - Logical location name or address
- pos: any - Position coordinates in GeoJSON

### <a name="class4"></a> TipV1 class

Represents a system tip. 

**Properties:**
- id: string - unique tip id
- topics: string[] - list of topics
- creator: PartyReferenceV1 - party who created the tip
- create_time: Date - date and time when tip was created
- title: MultiString - (optional) tip title in multiple languages
- content: MultiString - tip textual content in multiple languages
- more_url: string - (optional) URL with additional information
- pic_ids: [string] - (optional) array of picture block ids in storage attached to this tip
- docs: [AttachmentV1] - (optional) array of attached documents
- tags: [string] - (optional) explicit tags with annoucement topic for searching
- all_tags: [string] - (readonly) normalized array of explicit and hash tags used by search
- status: string - editing status: 'new', 'writing', 'translating', 'completed' (default: 'new')
- custom_hdr: Object - custom data summary that is always returned (in list and details)
- custom_dat: Object - custom data details that is returned only when a single object is returned (details)

## Operations

### <a name="operation1"></a> Method: 'POST', route '/tips/get_tips'

Retrieves a list of tips by specified criteria

**Request body:** 
- filter: object - filter parameters
  - topics: string - (optional) list of topics
  - status: string - (optional) editing status
  - from\_create\_time: Date - (optional) start of tip created interval
  - to\_create\_time: Date - (optional) end of tip created interval
  - tags: [string] - search tags
  - search: string - string for full text search in title, content and creator name
- paging: object - paging parameters
  - skip: int - (optional) start of page (default: 0). Operation returns paged result
  - take: int - (optional) page length (max: 100). Operation returns paged result

**Response body:**
DataPage<TipV1> or error

### <a name="operation2"></a> Method: 'POST', route '/tips/get\_random\_tip'

Retrieves a random tip from filtered resultset

**Request body:** 
- filter: object - filter parameters
  - topics: string - (optional) list of topics
  - status: string - (optional) editing status
  - from\_create\_time: Date - (optional) start of tip created interval
  - to\_create\_time: Date - (optional) end of tip created interval
  - tags: [string] - search tags
  - search: string - string for full text search in title, content and creator name

**Response body:**
Random TipV1 object, null if object wasn't found or error 

### <a name="operation3"></a> Method: 'POST', route '/tips/get\_tip\_by\_id'

Retrieves a single tip specified by its unique id

**Request body:** 
- tip_id: string - unique tip id

**Response body:**
TipV1 object, null if object wasn't found or error 

### <a name="operation4"></a> Method: 'POST', route '/tips/create_tip'

Creates a new system tip

**Request body:**
- tip: TipV1 - Tip to be created. If object id is not defined it is assigned automatically.

**Response body:**
Created TipV1 object or error

### <a name="operation5"></a> Method: 'POST', route '/tips/update_tip'

Updates system tip

**Request body:**
- tip: TipV1 - Tip to be updated

**Response body:**
Updated TipV1 object or error 
 
### <a name="operation6"></a> Method: 'POST', route '/tips/delete\_tip\_by\_id'

Deletes system tip specified by its unique id

**Request body:** 
- tip_id: string - unique tip id

**Response body:**
Deleted TipV1 object or error 
 
