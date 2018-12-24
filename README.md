
Research for JavaScript Event Logging and Behavior Analysis
====

# QuickStart
1. `git clone <location>`
2. `cd analytics`
3. `npm install`
4. `npm run dev` (runs with `-o` open browser flag)

# Presuppositions
Logging should
- Store statistics in a standard database/format not limited to JSON or CSV.
- Provide enough sufficient information to practice Data Science on a given datum.
- Be comprehensive enough in scope to practice Data Science on sets of data in their entirety.
- Use appropriate *metrics* to discern relativity of datasets.
- Maintain readability to professionals inspecting the data and not be limited to *log priority*.
- Maintain structural information for the purposes of compiling data for Reporting purposes.
- Be unobtrusively configurable to provide high-granularity of statistics across elements.
- Include versioning of the data-format to be provided.

#### Metrics
###### Each of the following is subject to Product Operations Management.
- *Priority*: `0`, `1`, `2`, `n`/`Infinity`
    - `0`: *Information* (No priority)
        - HTTP: Load, GET, POST, PUT, DELETE, etc
        - Keyboard: Focus, Blur, Arrow(N,S,W,E), etc
        - Mouse: Hover, Click, Submit, DragDrop, etc
    - `1`: *Warning* (Low priority)
    - `2`: *Error* (High priority)
    - `n`/`Infinity`: *Emergent* (Fatal)
- *Type*: As from Type Theory for identic efficacy.
- *Timestamp*: A timestamp in a portable format such as ISO, Unix, UTC, etc.
- *Version*: A floating point integer to denote expected data format.
- *Tags*: An array of string-types to filter & query logs.

#### Potential Targets
###### Each of the following is subject to Product Operations Management.
- `window.location`
- `window.navigator`
- `window.performance`
- `window.sessionStorage`
- `window.localStorage`
- `document.cookie`
- `document.activeElement`


# A Reasonable Strategy Across Environments and Time
Proper Sandboxing & Directorship, Liskov Substitution of strategies, Debounced or Throttled triggers, and a Queue structure are all highly recommended, if not necessary. However, Low-Scale implementations can vary. Ideally, an Application Director (Application Mediator) should govern cross-module communication and be responsible for capturing & storing a holistic application state at a given point in the UX; the Director can dispatch triggers for transferring log data to the server and can provide application state snapshots as well.

## Participants
At a minimum, the following types are required:
- `Stat` := *Model*: DTO (Data-Transport Object)
- `StorageStrategy` := *Singleton*:
    - Encapsulates a Data-Structure (Queue, LinkedList, Local & Session Storage)
    - Maintains a set of `Stat`s
    - Exposes a minimal data-operations protocol
- `LoggingStrategy` := *Singleton*: Encapsulates a `StorageStrategy`
- `LogService` := *Class*:
    - Encapsulates a `LoggingStrategy`
    - Implements an interface where Liskov Substitution can be performed with `console` (dev env)
- `AnalogDirective` := *Class*: Can inherit from a `BaseAnalogDirective` [base] class
- `Registrar` := *Module*: Bootstraps a `ConcreteAnalogDirective` with an `HTMLElement` and a `LogService`

## Definitions
Please note that JavaScript does not retain the concept of `interface`s in its lexicon. Even when using TypeScript, interfaces do not evaluate to anything when transpiled to JavaScript. As so, the following definitions are arbitrary and it is up to the developer to implement the precepts of these interfaces.

Before providing definition of the types above, please note the `IEventAggregator` interface to better understand the interfaces & classes below.

## `IEventAggregator`
    interface IEventAggregator {
        channels: Map<string, string>;
        publish(channel: string, ...splat) : IEventAggregator;
        subscribe(channel: string, handler: Function) : IEventAggregator;
        unsubscribe(channel: string, handler: Function) : IEventAggregator;
    }

## `Stat` (Data-Transport Model)

    class Stat {
        version: float;         // for Log Store versioning & updates
        priority: number;       // Log-Level (Priority)
        timestamp: Date;        // UTC, ISO, Unix, etc
        type: string;           // Focus, Blur, Hover, Load, Submit, Arrow, etc
        authority: object;      // User, Provider, Technician, etc
        details: any;           // arbitrary data to complement statistic
        tags: any[];            // for filtering & querying log-statistics
    }

These data are subject to Product Operations Management and versioning.

## `StorageStrategy`
##### `IStorageStrategy`: Optional
    interface IStorageStrategy {
        store: any;
        add(data: Stat) : void;
        next() : Stat;
        hasNext() : boolean;
        values() : Stat[];
        clear() : void;
    }
##### *`StorageStrategy`*
    class QueueStorageStrategy implements IStorageStrategy { }
    class LinkedListStorageStrategy implements IStorageStrategy { }
    class SessionStorageStrategy implements IStorageStrategy { }

##### NOTE
The `StorageStrategy` may opt to employ Browser Storage (SessionStorage, LocalStorage, IndexedDB) to mitigate redundant log-data when User has multiple Browser Tabs open (e.g. duplicates a tab), however, using such storage should be a fallback to employing a `SharedWorker` (`WorkerLoggingStrategy`) which can decrease the load on UI performance as it runs in its own thread.

## `LoggingStrategy`
##### `ILoggingStrategy`: Optional
    interface ILoggingStrategy extends IEventAggregator {
        store: IStorageStrategy;
        publish(type: string, ...splat) : ILoggingStrategy;
    }
##### *`LoggingStrategy`*
    class HTTPLoggingStrategy implements ILoggingStrategy { }
    class WebSocketLoggingStrategy implements ILoggingStrategy { }
    class WorkerLoggingStrategy implements IWebWorker { }

### WebWorkers (`WebWorker`, `SharedWorker`, `ServiceWorker`): Optional
##### `IWorkerLoggingStrategy`
    interface IWebWorker extends IEventAggregator {
        strategy: ILoggingStrategy;
        publish(type: string, ...splat) : IWebWorker;
    }
##### `WorkerLoggingStrategy`
    class WorkerLoggingStrategy implements IWebWorker { }
##### NOTE
The `IEventAggregator` and the `ILoggingStrategy` interfaces define a `publish` method having identical signatures. As so, a `LogService` may use Liskov Substitution between the two implementations.

## `LogService`
##### `ILogService`: Optional
    interface ILogService {
        strategy: ILoggingStrategy;
        log(data: Stat) : void;
        info(data: Stat) : void;
        warn(data: Stat) : void;
        error(data: Stat) : void;
    }
##### *`LogService`*
    class LogService implements ILogService { }

##### NOTE
The `ILogService` and the native `Console` interfaces define a set of methods having identical signatures. As so, an `AnalogDirective` may use Liskov Substitution between the two implementations.

## `AnalogDirective`
    class AnalogDirective {
        constructor($: Sandbox, logger: ILogService) { }
        init(options?: any) { }
    }

##### NOTE
An `AnalogDirective` may inherit from or decorate a `BaseAnalogDirective` for functionality common among directives.

## `Registrar` (Implementer)

    $('[data-analog]').analyze({...});
    -- or --
    @Directive({ selector: '[data-analog]' }) class AnalogDirective {
        @Input() dataAnalog: object;
    }
    -- etc --

Registration & Bootstraping of functionality should be implemented as its own, standalone module as it will vary from environment to environment. It is not unreasonable for the Registrar to implement *The State Pattern*, *The Strategy Pattern* or another design pattern to reduce the complexity of bootstrapping discrete types of Analog Directives based upon configuration values.

## `Sandbox` & `Director` *(Recommended)*
##### `Director`
    class Director implements IEventAggregator { }
##### `Sandbox`
    class Sandbox implements IEventAggregator {
        private director: Director;
    }


## Implementation
The solution provided herein can follow a few basic rules of thumb:
- Analogs are classes which get bootstrapped to an element (usually DOM).
- Analogs may require a map, depending on bootstrapping and configuration (`<el data-analog="x">`, `{ 'x': Class }`).
- Analogs, ideally, only hold awareness to a `LogService` and|or a `Sandbox`.
- Analogs can receive a `data-logoptions` property value for high-granularity of configuration.
- Manual bootstrapping depends upon environment and may require a map.

#### Bootstrapping
Bootstrapping is necessary to bind a DOM element with a class. In the strategy outlined above, an element is targeted by its `data-analog` property in order to encapsulate it within its appropriate `AnalogDirective` class. However, the implementation in `registrar.jquery.js` may not be necessary in, say, an *Angular* environment as Angular takes care of bootstrapping elements to classes automatically on its own. Nevertheless, it may make sense to still implement a *bootstrap-map* in order to encapsulate the correct *type* of AnalogDirective with its correct class. This can be aided using *The State Pattern* -- alongside the bootstrap-map -- based upon what value exists for the component's `data-analog` property.

<div style="background-color: goldenrod; color: #333; font-weight: bold;">
    Note that if an AnalogDirective is not hearing events that it is listening for, it is likely that it is getting bootstrapped after another class that is silencing the event.
</div>

##### With our jQuery Plugin example, we have to *manually* select and construct our AnalogDirectives:
    $('[data-analog]').analyze();
    ...
    var AnalogDirective = map[ element.dataset.analog ];
    var instance = new AnalogDirective(...);
##### With an Angular example, we may target an element to analyze and let Angular bootstrap our AnalogDirectives *automatically*:
    @Directive({
        selector: '[data-analog]',
        ...
    })
    export class AnalogContext {
        @Input('dataAnalog') type: string
        analogMap: object {
            'anything': SomeAnalog
        };
        constructor() {
            var Analog = analogMap[this.type];  // if this.type equals 'anything' then Analog equals SomeAnalog
            return new Analog();
        }
    }
    @Component({
        ...
        template: `<input dataAnalog="anything" />`
        ...
    }) export class SomeComponent { }
###### Please see Angular's [Attribute Directives](https://angular.io/guide/attribute-directives) for more information.

##### Configuration
###### HTML
    <element data-analog="any-value" data-logoptions="{{json}}"></element>
###### Bootstrap Mapping
    {
        "any-value": SomeAnalogDirectiveClass
    }

##### Log Redundancy
Given that log statistics may be cached on a Client application, as a User may take the action to leverage multiple browser tabs, each with their own instantiation of objects in the memory heap, it is possible that duplication of the same statistic can occur. Ideally, a daemon such as a SharedWorker is employed to encapsulate log-data within a separate Background Process, however, support for SharedWorkers is still in early stages. As so, a good solution is to leverage a Client data-store not unlike SessionStorage, and to synchronize log-data from this central store.

###### Synchronization of Data
- Encapsulate data-synchronization within a `StorageStrategy` such as "`SessionStorageStrategy`".
- Employ this StorageStrategy by a LoggingStrategy.

##### Mediation
If mediation of Logging is necessary within the application, an Application Director (or a sub-director) may partition the coupling between a LogService and a LoggingStrategy using Liskov Substitution -- as both a Director and a LoggingStrategy define a `publish` method on their interface.

###### Sandbox
Not unlike the pattern described above in *Mediation*, an AnalogDirective may call a `log` method from an Application Sandbox (or domain-sandbox) to route such request toward the LoggingStrategy, likely via a Director.

## Designing and Defining Analogs
There are 4 types of Analogs the Developer can employ to capture the right statistics of an element, depending on the element's scope:
- Component-Based Analogs
- Base Analogs
- A Global Analog
- Strongly Coupled Analogs

### Component Based Analogs (*Recommended/Default*)
Component-Based Analogs are typical in that they encapsulate a single element or component and capture various types of statistics on that component and that component alone. These metrics are not unlike keyboard events -- *enter*, *arrow-keys* and others -- mouse-events `blur`, `focus`, `click` -- internal state changes, errors, and indirect method calls. These Analogs align with the *SOLID Principles*, namely, *Single Responsibility Principle (SRP)*.

### Base [Superclass] Analogs (*Recommended*)
Base Analogs can and should be used for any common analysis needed to be conducted between Component-Based Analogs. For example, an Analog which analyzes a *SchedulerWidget* and an Analog which analyzes an *InputDatepickerWidget* may extend a common *BaseCalendarAnalog*. Because of the similarity in analysis they need to perform, each Analog can inherit functionality from a *Base* or *Common* Superclass. These Analogs align with the *SOLID Principles*, namely, *Open/Close Principle (OCP)*.

### A Global (High-Level Component) Analog
A Global Analog is a type of Component-Based Analog whose *scope* encapsulates a global or a high-level context -- usually the highest scope available. This is a single Analog responsible for *Global Exception* statistics, *Load-Timing*, *Application State*, *Inter-Component Communication*, and other high-level statistics. When performing analysis on `window`  data, `document` data, or subproperties of these, use a Global Analog. It is a good strategy to encapsulate each different type of analysis within its own class and then use these as *mixins* to, say, an *ApplicationAnalog*. This can be achieved through *Prototypical Inheritance*, *The Decorator Pattern*, or *Constructor-Hijacking*. A Global Analog aligns with the *SOLID Principles*, namely, *Single Responsibility Principle (SRP)* and *Interface Segregation Principle (ISP)*.

### Strongly Coupled Analogs (*Avoid*)
Strongly Coupled Analogs analyze a common metric across multiple elements. For example, one may determine that only `focus` events need to be collected for an entire web-page. A Strongly Coupled Analog can be bootstrapped to the highest parent-element and listen for `focus` events of all of its children & grandchildren. **Strongly Coupled Analogs should be avoided at all costs**. They do not conform to *SOLID Principles* and will make adding, changing, and removing Components and Analogs to the UI much more difficult.


## Using a `Sandbox`
It is recommended, in any application, to provide every module a `Sandbox` which provides a reliable and consistent interface for modules over time. This is beneficial because it reduces *Link-Degree (Fan-In & Fan-Out)* for each module and effectively weakens Coupling. Instead of having one module Fan-Out to, say, seven different dependencies, that module now only requires a single dependency: the sandbox. This is also helpful when migrating systems as often a "*Branch By Abstraction*" (BBA) is necessary. In addition, the sandbox acts as a *Facade Pattern* across the application Core -- utilities and other interfaces. As so, TDD becomes much easier as the developer only has to mock a single dependency. The sandbox protects the application core from direct contact with subcomponents of the system. A sandbox may also provide a *PublishSubscribe* interface for inter-module communication.


## Using a `Director`
It is recommended, in any application, to provide a `Director` to mediate communication between modules. This system, usually encapsulated behind a Facade such as a `Sandbox`, implements *The Mediator Pattern* via an *EventAggregator* or through regular method-calls. The intention is that as complexity grows with module-to-module communication, such complexity can be focused into a *director* whose chief purpose is to trigger behavior in one or more modules based upon any given action of another module. Additionally, the director can perform operations between interactions such storing application state or logging. A director is a great way to decouple modules and implement the Dependency Inversion Principle (DIP) from SOLID.


## Using Liskov Substitution and The Adapter Pattern
The choice to leverage an Adapter over Liskov Substitution is trivial because an Adapter's intention in to conform one interface to another, effectively allowing one object to be swapped out (or substituted) for another. [Liskov Substitution](https://en.wikipedia.org/wiki/Liskov_substitution_principle) is one of the five [SOLID Principles](https://en.wikipedia.org/wiki/SOLID_(object-oriented_design)). For the strategy defined above, there are a few instances where we can substitute another class for the one we have already defined:
- `LogService`
- `LoggingStrategy`

### `LogService`
#### `LogService` ~ `Console`
The `LogService` can be swapped out for the native `Console` instance. This is because an `AnalogDirective` only calls methods on the `LogService` which also exist on the native `window.console` object -- `log`, `info`, `warn`, and `error`.

#### `LogService` ~ `Sandbox`
Ideally, a module will not even depend directly on the `LogService`. Instead, a `Sandbox` should be provided to the module which allows modules to invoke logging methods (`log`, `info`, et al). Please see the section "Using a Sandbox" for more detail.


### `LoggingStrategy`
#### `LoggingStrategy` ~ `Director`
Because in our strategy outlined above the `LoggingStrategy` and a `Director` both implement a `publish` method, we can interject (substitute) a director in place of the `LoggingStrategy` without breaking dependants of the interface. This is helpful if cohesion between one `AnalogDirective` and another is necessary.


## Synopsis
Weak-Coupling was employed for this prototype with a strong Separation of Concerns due to the potentially radical variance across the suspected set of target environments. As so, few shortcuts may be taken in persuit of sacrificial deadlines; these sacrifices have been denoted by "*Optional*" labels. Alongside, we have architectural recommendations regarding Software Coupling, from the Researcher, which we may employ to normalize application components and their interaction across the system and time. With this in mind, we can apply the patterns and frameworks within this repository across platforms with minimal overhead to bear, as long as a willingness is followed to *encapsulate what varies* and *program to an interface instead of implementations*.


# Resources & Citations
- [SOLID Principles](https://en.wikipedia.org/wiki/SOLID_(object-oriented_design))
- [JavaScript Tracking vs Web Log Analytics](https://www.slideshare.net/PiwikPRO/javascript-tracking-or-web-log-analytics)
- ##### Can I Use
    - ###### Performance
        - [Navigation Timing API](https://caniuse.com/#feat=nav-timing)
        - [User Timing API](https://caniuse.com/#feat=user-timing)
        - [High Resolution Timing API](https://caniuse.com/#feat=high-resolution-time)
        - [Resource Timing](https://caniuse.com/#feat=resource-timing)
    - ###### Background Processes / Daemons / Multi-Thread
        - [SharedWorkers](https://caniuse.com/#feat=sharedworkers)
        - [ServiceWorkers](https://caniuse.com/#feat=serviceworkers)
        - [WebWorkers](https://caniuse.com/#feat=webworkers)
        - [WebSockets](https://caniuse.com/#feat=websockets)
        - [EventSource (Server-Sent Events)](https://caniuse.com/#feat=eventsource)
    - ###### Data-Stores
        - [IndexedDB](https://caniuse.com/#feat=indexeddb)
        - [LocalStorage](https://caniuse.com/#feat=namevalue-storage)
        - [SessionStorage](https://caniuse.com/#feat=namevalue-storage)

- [WebSocket Backend Used for This Demo](https://www.websocket.org/echo.html)
- [HTTP-Server (to lift this demo)](https://www.npmjs.com/package/http-server)