## Aarden: The Signal-Driven Approach to Software

> "The brain is a world consisting of a number of unexplored continents and great stretches of unknown territory."
— Santiago Ramón y Cajal, Nobel Prize-winning neuroscientist

#### contextual awareness, paradoxical reasoning and circular detection?
Aarden is not a framework. It's a reactive, adaptive toolkit for composing software through signals, structured data flows, and intelligent process management. It introduces a new way of thinking about applications - one that mimics the principles of neural networks, quantum mechanics, and information theory to create systems that are modular, scalable, and self-propagating.

At its core, Aarden consists of two main components:

- **AardenJS** – The lightweight signal-driven toolkit. This can be added to any JavaScript project to enhance event handling, reactive structures, and inter-component communication.
- **AardenSDK** – The structured ecosystem for those who want to build full applications with functional objects, client-server synchronization, and modular applets.

Aarden doesn't impose rules, it provides tools; use what you need, ignore what you don't.

---


## Signals, Synapses, and the Plexus

Aarden is built on the concept of the Plexus, a reactive broker that manages structured data interactions.

A Plexus:

- Listens only for signals it has been instructed to trap and handle.
- Routes data between sources and consumers dynamically.
- Propagates changes only when necessary, minimizing unnecessary computations.

![image](docs/images/1740681936247.jpg)

Much like neurons in a brain, Plexii (plural of Plexus) don't respond unless they are actively listening for a given signal. This means zero wasted computation; Aarden is built for efficiency.

Each Plexus:

- Can have multiple sources.
- Can signal actions to many listeners.
- Stops propagating when a valid response is found.

This is different from classical event bubbling, but rather signal selection using a crystal algorithm grown from sources, traps, listeners and signals. These 4 interface points form a single unit, a geometrical tetrahedron as the kernel of a plexus; for without any of these, it's inert.

> *a song dedicated to this principle in Aarden: [crystal algorithm](https://youtu.be/V1PW7AYIx-c)*

#### SEMI-CRUD: A Structured Yet Fluid Data Model

Aarden's SEMI-CRUD data model introduces a flexible approach to working with data, or any reference. Each word is a globally accessible method that emits a signal when run, or when any property of it is accessed - existing or not.

These global methods (plexii) operate in context and handle "the matter" it was called with according to its identifier type and its value.

> *in Aarden, "the matter" refers to the first argument given in a function call*

- `Select` – Retrieve specific matter.
- `Exists` – Check if matter exists before acting on it.
- `Modify` – Change matter dynamically.
- `Insert` – Add new matter.
- `Create` – Generate new matter.
- `Remove` – Erase matter, gracefully.
- `Update` – Synchronize changes across the system.
- `Detect` – Identify anything according to type and kind.

This system allows for graceful degradation, much like missing elements don't break processes in CSS, or the DOM for example. Instead of just throwing errors and have them bubble unguided, Aarden's signals respond dynamically, handles any failure within the signal propagation cycle.

Other globals that Arden introduce, such as `Device` have semi-crud methods themselves - which operate on the plexus they belong to; these methods are also seen in other globals such as `Object`.

The principle here is just like e.g: `Object.create`, `Object.assign`, etc; this is seen through all the globals, for example:

- `Object.detect` - type of matter, or detect circular matter (optional)
- `String.detect` - type of string, e.g: target, object, script, etc.
- `Method.detect` - type of function, e.g: class, function, callback, method.

---


## AardenJS: A Toolkit, Not a Framework

Most frameworks demand commitment. AardenJS does not. It can be dropped into any JavaScript project, providing tools for:

- Signal-driven workflows
- Efficient event handling
- Dynamic state propagation
- Plexus-based communication between objects, or functions

![image](docs/images/1740681339532.jpg)

AardenJS lets developers compose reactive, self-organizing systems inside any existing JavaScript codebase.

For example:

```js
const dataPlex = ( new Plexus() ).listen
({
    fetchData ( signal )
    { return `Hello ${signal.name}!` }
});

dump( dataPlex.signal("fetchData", {name:"Bob"}) ); // Hello Bob!
```
No unnecessary complexity.

---


## AardenSDK: Composing Modular Applets

While AardenJS is a toolkit, the AardenSDK is a structured environment for building applications using Aarden's principles.

In Aarden, an applet is a self-contained unit, a Plexus of functional objects that can operate independently or as part of a larger system.

![image](docs/images/1740681936248.jpg)

This structure allows applications to be built like assembling LEGO blocks -  modular, reusable, and highly adaptive, because, all components are signal-driven, meaning:

- State is automatically synchronized.
- Client and server logic exist within the same functional object.
- Dependencies are resolved dynamically.

---


## The Seed: Snapshots of a Running Aarden Process

In Aarden, snapshots can be taken of an entire running system, freezing all active Plexii and their current state into a single, installable package.

![image](docs/images/1740681936249.jpg)

This snapshot, called the Seed or Flame, contains:

- All live Plexii and their signals.
- All event listeners and dependencies.
- Serialized state, allowing it to be restored elsewhere.


This means an entire Aarden process can be paused, transferred, and restarted identically.

---


## Beyond Software: A Mycelial Network of Narrow AI

Aarden is built on the principles of distributed intelligence. It is not just for frontends, backends, or full-stack apps; it is also designed to function as a network of collaborating AI agents.

By connecting AardenJS and AardenSDK to AI workflows, developers can:

- Orchestrate AI tasks across multiple specialized models.
- Compose intelligent processes dynamically.
- Enable AI-to-AI collaboration via signal-driven workflows.


Aarden can be used to integrate conversational LLMs, narrow AI agents, and real-world automation systems, making it a composable intelligence layer rather than just another software tool.

---


## Conclusion: Aarden is an Evolution in Software Composition

Aarden challenges traditional software development paradigms by introducing a signal-driven, adaptive, and modular approach. It is not a framework - it is a toolkit that enhances existing projects, and an ecosystem for those who want a structured, composable environment.

It allows developers to build software like nature builds networks efficiently, reactively, and without unnecessary complexity.

![image](docs/images/1740681792216.jpg)

> “Look deep into nature, and then you will understand everything better.”
— Albert Einstein



Aarden is not just a tool. It's a new way to think about software.

---


## Collaboration

Join the revolution!

Allow us to inspire you with art dedicated to this project:
- official music album: [Aarden - Signal Of Creation](https://youtube.com/playlist?list=PLjZRkWY4UWAicrIzP6qJN8xOpDQ_VlMp3)

This repository here serves as a silo of ideas and public interaction hub for this project; however the source code is revealed .. from `a to b` [Zm9sbG93IHRoZSBzaWduYWw](https://gitlab.com/sudo8594302/aarden.git) .
