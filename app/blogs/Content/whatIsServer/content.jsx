"use client";
import Image from "next/image";
import { faqs } from "./faqs";
import {
  ArticleShell,
  H2,
  P,
  Callout,
  Timeline,
  CheckList,
  FAQ,
} from "@/app/blogs/components/article";

// Each diagram ships a light and a dark render; only the one matching the
// theme is displayed, and lazy loading skips the hidden one.
const Diagram = ({ name, alt, width, height, caption }) => (
  <figure className="my-10">
    {/* Background matches the images' own, so they sit flush in the frame */}
    <div className="overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
      <Image
        src={`/blog/whatIsServer/${name}.png`}
        alt={alt}
        width={width}
        height={height}
        sizes={`(min-width: ${width}px) ${width}px, 100vw`}
        className="mx-auto h-auto w-full dark:hidden"
        style={{ maxWidth: `${width}px` }}
      />
      <Image
        src={`/blog/whatIsServer/${name}-dark.png`}
        alt={alt}
        width={width}
        height={height}
        sizes={`(min-width: ${width}px) ${width}px, 100vw`}
        className="mx-auto hidden h-auto w-full dark:block"
        style={{ maxWidth: `${width}px` }}
      />
    </div>
    <figcaption className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">
      {caption}
    </figcaption>
  </figure>
);

const visitSteps = [
  {
    title: "Your browser sends a request",
    description:
      "You type an address or click a link, and your browser asks a server for that page.",
  },
  {
    title: "The server receives it",
    description:
      "Software on the server is listening for requests and picks this one up.",
  },
  {
    title: "The application decides what needs to happen",
    description:
      "Code running on the server works out what you asked for and what it takes to answer.",
  },
  {
    title: "The database may be queried",
    description:
      "If the page needs stored information, such as your profile or a list of products, the application fetches it.",
  },
  {
    title: "The result is sent back",
    description:
      "The server packages the answer into a response and returns it across the internet.",
  },
  {
    title: "Your browser draws the page",
    description:
      "Your browser turns that response into the webpage you see.",
  },
];

const hardware = [
  "CPUs to do the work",
  "RAM to hold what is being worked on",
  "Storage for files and data",
  "Network interfaces to talk to other computers",
  "Power supplies to keep them running",
  "Cooling systems to stop them overheating",
];

const BlogContent = () => (
  <ArticleShell
    category="Backend"
    title="What Is a Server? A Beginner's Guide"
    deck="Every click, message and video starts with a request to a computer somewhere else. Here is what that computer is, where it lives, and what it actually does."
    date="Sep 17, 2026"
    readTime="5 min read"
    image="/blog/whatIsServer.png"
    imageAlt="A browser sending a request to a server and receiving a response"
    imageCaption="Almost everything you do online is a conversation between a client and a server."
    url="https://www.dsavisualizer.in/blogs/Content/whatIsServer"
    hashtags="#Backend #Servers #WebDevelopment"
  >
    <P>
      Every time you open Instagram, watch a YouTube video, visit a website,
      send a message, or order something online, you are interacting with
      something called a server. But what exactly is a server? Is it a special
      type of computer? Where does it exist? What does it actually do? And why
      do websites need so many of them?
    </P>

    <Callout title="In one line">
      A server is a computer running software that is designed to serve
      requests, or provide a service, to other computers.
    </Callout>

    <H2 id="what-is-a-server">What is a server?</H2>
    <P>
      A server doesn&apos;t have to be some mysterious machine sitting in a huge
      data center. At its core, it is simply a computer whose job is to answer
      other computers.
    </P>
    <P>
      For example, when you open a website, your browser sends a request to a
      server. The server receives the request, does whatever work is necessary,
      and sends a response back.
    </P>

    <Diagram
      name="request-response"
      alt="Diagram of a browser (the client) sending a GET request to a server, and the server sending back a response containing HTML, CSS and data"
      width={460}
      height={230}
      caption="A request goes out, a response comes back. That exchange is behind almost everything you do online."
    />

    <P>
      Say you type a website address into your browser. You might think the
      website is somehow &ldquo;inside&rdquo; your browser. It isn&apos;t. Your
      browser is simply asking another computer: &ldquo;Hey, can you give me
      this website?&rdquo;
    </P>
    <P>
      That request travels through the internet to a server. The server
      processes it and sends the necessary information back. This is the
      fundamental idea behind the <strong>client-server model</strong>: your
      browser is the client, and the computer providing the service is the
      server.
    </P>

    <H2 id="visiting-a-website">What happens when you visit a website?</H2>
    <P>
      Let&apos;s make this a little more interesting. Imagine you open a website
      and see its homepage. What actually happened? A simplified version looks
      something like this:
    </P>

    <Diagram
      name="request-flow"
      alt="Diagram of a request travelling from the browser to the server, then the application, then the database, with the response travelling back up the same path"
      width={400}
      height={430}
      caption="A simplified request path. Real systems add more layers between these boxes, but the shape stays the same."
    />

    <Timeline items={visitSteps} />
    <P>
      There can be many more components involved in practice, but this gives
      you a useful mental model to build on.
    </P>

    <H2 id="where-is-it-stored">But where is the website actually stored?</H2>
    <P>
      This is where the idea of a server gets more interesting. Websites need
      somewhere to store their files and run their applications. Those
      resources are stored and processed on servers, and those servers
      physically exist somewhere. They aren&apos;t floating around in the
      internet.
    </P>

    <H2 id="physical-computers">Servers are physical computers</H2>
    <P>
      When people say something is &ldquo;stored in the cloud,&rdquo; it can
      sound like the data exists somewhere abstract. But the cloud ultimately
      runs on physical hardware. Servers are computers with the same kinds of
      parts you would expect:
    </P>
    <CheckList items={hardware} />
    <P>
      They are designed to run workloads and communicate over networks, and
      they are commonly placed inside <strong>data centers</strong>. A single
      data center can contain thousands of servers.
    </P>

    <H2 id="server-vs-computer">Is a server different from a normal computer?</H2>
    <P>
      Here&apos;s something that surprises many beginners: a server is still a
      computer. There isn&apos;t some magical component that turns a computer
      into a server.
    </P>
    <Callout title="What actually makes it a server">
      The difference is mainly what the computer is being used for, and what
      software it is running.
    </Callout>
    <P>
      Your laptop, for example, can run a web server. Start a server
      application on it, allow another computer to connect, and your laptop is
      now acting as a server.
    </P>

    <H2 id="faq">Common questions</H2>
    <FAQ items={faqs} />

    <H2 id="whats-next">What&apos;s next?</H2>
    <P>
      Understanding what a server is gives you the foundation for
      understanding how the internet and modern applications actually work.
      But this is only the beginning. Look a little deeper and you&apos;ll come
      across ports, sockets, HTTP, databases, APIs, reverse proxies, load
      balancers, and system architecture.
    </P>
    <P>
      If you want to go beyond the basics and learn how backend systems work in
      more detail, explore{" "}
      <a
        href="https://www.backendengineer.in/"
        target="_blank"
        rel="noopener"
        className="font-medium text-blue-600 dark:text-blue-400 underline underline-offset-4 decoration-blue-600/30 hover:decoration-blue-600"
      >
        BackendEngineer.in
      </a>
      , which goes deeper into backend engineering concepts and the systems
      behind the applications we use every day.
    </P>
    <P>
      A server is just the beginning. There&apos;s a whole world behind what
      happens after you click &ldquo;Send.&rdquo;
    </P>
  </ArticleShell>
);

export default BlogContent;
