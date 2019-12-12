<a name="module_klaviyo-node"></a>

## klaviyo-node

* [klaviyo-node](#module_klaviyo-node)
    * [~Klaviyo](#module_klaviyo-node..Klaviyo)
        * [new Klaviyo(publicKey, [options])](#new_module_klaviyo-node..Klaviyo_new)
        * [.track(eventName, [customerProperties], [eventProperties])](#module_klaviyo-node..Klaviyo+track) ⇒ <code>Promise</code>
        * [.identify([customerProperties])](#module_klaviyo-node..Klaviyo+identify) ⇒ <code>Promise</code>

<a name="module_klaviyo-node..Klaviyo"></a>

### klaviyo-node~Klaviyo
A Class for Klaviyo tracking. This class creates an object that
makes it easy to send Server-Side events to Klaviyo. More
documentation about Klaviyo Server-Side events can be found
here: https://www.klaviyo.com/docs/http-api

**Kind**: inner class of [<code>klaviyo-node</code>](#module_klaviyo-node)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| transport | <code>Winston.Transport</code> | (default: Console) - A       Winston Logger Transport object. When a Transport is passed, all       log messages will be forwarded to that transport instead of the       default Console output. |
| log | <code>Boolean</code> | (default: true) - If true, this module       will output log messages using the defined or default Transport |
| logLevel | <code>String</code> | (default: info) - Decide which level       log messages should be outputted for. |
| apiBasePath | <code>String</code> | (default: https://a.klaviyo.com/api) -       The base URL to which to send the track and identify calls to. |


* [~Klaviyo](#module_klaviyo-node..Klaviyo)
    * [new Klaviyo(publicKey, [options])](#new_module_klaviyo-node..Klaviyo_new)
    * [.track(eventName, [customerProperties], [eventProperties])](#module_klaviyo-node..Klaviyo+track) ⇒ <code>Promise</code>
    * [.identify([customerProperties])](#module_klaviyo-node..Klaviyo+identify) ⇒ <code>Promise</code>

<a name="new_module_klaviyo-node..Klaviyo_new"></a>

#### new Klaviyo(publicKey, [options])
Initialize a new `Klaviyo` with the Klaviyo public key and an
optional dictionary of `options`.


| Param | Type | Description |
| --- | --- | --- |
| publicKey | <code>String</code> | The public key that comes with every Klaviyo account. |
| [options] | <code>Object</code> | (optional) |

<a name="module_klaviyo-node..Klaviyo+track"></a>

#### klaviyo.track(eventName, [customerProperties], [eventProperties]) ⇒ <code>Promise</code>
Used to track when someone takes an action or does something.

**Kind**: instance method of [<code>Klaviyo</code>](#module_klaviyo-node..Klaviyo)  
**Returns**: <code>Promise</code> - Returns a Promise with the result of the Klaviyo
    request.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| eventName | <code>String</code> |  | The type of Klaviyo request (track/identify) |
| [customerProperties] | <code>Object</code> | <code>{}</code> | Custom information     including email or id identifier about the person     who did this event. |
| [eventProperties] | <code>Object</code> | <code>{}</code> | Custom information about the person who did this event. |

<a name="module_klaviyo-node..Klaviyo+identify"></a>

#### klaviyo.identify([customerProperties]) ⇒ <code>Promise</code>
The identify method allows you to identify and set properties on
an individual.

**Kind**: instance method of [<code>Klaviyo</code>](#module_klaviyo-node..Klaviyo)  
**Returns**: <code>Promise</code> - Returns a Promise with the result of the Klaviyo
    request.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [customerProperties] | <code>Object</code> | <code>{}</code> | Custom information     including email or id identifier about the person     who did this event. |

