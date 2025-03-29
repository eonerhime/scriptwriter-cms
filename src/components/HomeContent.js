"use client";

// import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaQuoteLeft, FaQuoteRight, FaStar } from "react-icons/fa";
import Button from "@/components/Button";

const testimonials = [
  {
    text: "Ifeoma is a masterful storyteller with a unique voice and vision. Her scripts are meticulously crafted, with complex characters, razor-sharp dialogue, and narratives that captivate and inspire. I can't wait to see what she comes up with next.",
    name: "Iyke-u-Anthoni – Nollywood Director",
    rating: 5,
  },
  {
    text: "Ifeoma is a gifted screenwriter with a unique voice. She has crafted exceptional scripts for me, including Indigo Glass, Akpos and Company, Mr. Wonderful, and Scarred. Her creativity and dedication make her a top choice for any screenplay project.",
    name: "Mike Nliam –  Veteran Nollywood producer",
    rating: 5,
  },
  {
    text: "Ifeoma's insightful feedback pushed me to refine my script in ways I hadn't considered. Her detailed notes were both actionable and encouraging, making my story stronger. If you need a screenwriter who truly understands structure and character, she's an invaluable resource.",
    name: "Oneme Ofurhie – Digital Animator, Producer USA",
    rating: 5,
  },
  {
    text: "Ifeoma Onerhime masterfully adapted my novel Burning Hurt into a compelling screenplay. Her passion, creativity, and keen storytelling brought my characters to life in unexpected ways. Professional, dedicated, and a joy to work wit — I highly recommend her for capturing emotion and depth in any script.",
    name: "-	Amb. Dr. Unyime-Ivy King – Author, Burning Hurt",
    rating: 5,
  },
  {
    text: "Ifeoma Onerhime transformed my deeply personal experiences into a powerful script with empathy and skill. Her warm, attentive nature made sharing my story effortless, and she captured its essence even better than I could. I have no regrets working with her and will do so again. If you need a screenwriter who truly listens and understands, I highly recommend Ifeoma.",
    name: "Misan Udogie – Author,  Executive Producer 'My Name is Misan'",
    rating: 5,
  },
];

const btnStyle =
  "w-auto px-6 py-3 border-2 border-primary-50 border-style:solid rounded-md uppercase font-bold text-center cursor-pointer hover:bg-primary-50 hover:text-primary-900 transition";

export default function HomeContent({ profileImage }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000); // Auto-scroll every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const nextTestimonial = () => {
    setIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  return (
    <>
      {/* Landing Content */}
      <section className="grid grid-cols-1 min-[601px]:grid-cols-[40%_60%] text-start mt-24">
        <div className="order-2 mt-4 flex flex-col justify-center min-[601px]:mt-20 min-[601px]:order-1 md:gap-8">
          {/* Animated Heading */}
          <p
            className="mt-6 text-xl text-center min-[601px]:text-start min-[601px]:text-2xl uppercase"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <strong>Let&apos;s</strong> <em>Create</em>{" "}
            <strong>Something</strong> <em>Great</em> <strong>Together</strong>
          </p>

          {/* Animated Description */}
          <p
            className="text-sm mt-4 text-center min-[601px]:text-start md:pr-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            I am a script writer, author and content writer. I bring to life
            your ideas for your films, TV and documentary.
          </p>

          {/* Animated Button */}
          <div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
            className="mt-6 mx-auto min-[601px]:mx-0"
          >
            <Button btnStyle={`${btnStyle} flex gap-2 w-auto px-6 py-3`}>
              <Link href="/contact">Let&apos;s Talk</Link>
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                  />
                </svg>
              </span>
            </Button>
          </div>
        </div>

        {/* Animated Profile Image */}
        <div
          className="order-1 md:order-2 flex justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <image
            // quality={80}
            src={profileImage}
            alt="Ifeoma Emo-Onerhime"
            width={600}
            height={600}
            className="h-full w-fit max-w-[100%] object-cover overflow-visible"
          />
        </div>
      </section>

      {/* Section Separator */}
      <div className="w-[99.175%] opacity-25 border-t border-primary-100 mt-15 mb-15 " />

      {/* About Section */}
      <section className="relative w-full grid-cols-1 gap-8 dark:bg-primary-50 dark:bg-primary-900 dark:text-primary-50 grid md:grid-cols-2 min-[601px]:pr-2">
        <div className="order-1 md:mt-24 min-[601px]:order-1">
          <div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className=""
          >
            <h2 className="text-xl uppercase font-semibold text-center min-[601px]:text-start min-[601px]:text-2xl">
              About Me
            </h2>
            <p className="mt-4 text-sm text-center min-[601px]:text-start ">
              With a passion for storytelling, I craft engaging narratives for
              films, TV series, and blogs. I turn ideas into captivating
              stories.
            </p>
          </div>
        </div>

        <div className="clear md:absolute left-0 bottom-18 order-3 mt-0 text-sm text-center min-[601px]:text-start min-[601px]:order-3 min-[840px]:col-span-1">
          <p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            📌 Scriptwriting | Blogging | Copywriting
          </p>

          <div className="flex justify-center min-[600px]:justify-start">
            <div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              whileHover={{ scale: 1.1 }}
              className="mt-6 origin-center" // Ensures even scaling
            >
              <Button btnStyle={`${btnStyle} bg-primary-700 text-primary-50`}>
                <Link href="/about">Read more...</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* About image */}
        <div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="order-2 mb-0 overflow-hidden h-[200px] min-[601px]:order-2 md:h-[400px]"
          //  md:mt-16 md:mb-16
        >
          <img src="/about-me.jpg" alt="About" className="w-max" />
        </div>
      </section>

      {/* Section Separator */}
      <div className="w-[99.175%] opacity-25 border-t border-primary-100 mt-15 mb-15 " />

      {/* Services Section */}
      <section className="w-full text-center min-[601px]:text-start min-[601px]:pr-2">
        <h2 className="text-xl uppercase font-semibold min-[601px]:text-2xl">
          My Services
        </h2>
        <div className="mt-8">
          <div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <p className="mt-2">
              Great stories deserve great scripts! Whether it’s a film, TV
              series, web content, or short film, I craft engaging,
              well-structured scripts that captivate audiences and bring ideas
              to the screen.
              <br />
              <br />
              ✨ What I Offer:
              <br />
              <br />
              🎬 Screenwriting – From concept to polished script.
              <br />
              <br />
              📝 Dialogue Perfection – Authentic and impactful conversations.{" "}
              <br />
              <br />
              🎭 Character Development – Creating memorable, dynamic characters.{" "}
              <br />
              <br />
              📖 Story Structuring – Ensuring strong narratives with compelling
              arcs. Ready to transform your vision into a masterpiece?
            </p>

            <div className="flex justify-center min-[601px]justify-start">
              <div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                whileHover={{ scale: 1.1 }}
                className="mt-6 origin-center"
              >
                <Button btnStyle={`${btnStyle} mt-4`}>
                  <Link href="/services">
                    <span className="underline">Explore My Services</span> 🚀
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Separator */}
      <div className="w-[99.175%] opacity-25 border-t border-primary-100 mt-15 mb-15 " />

      {/* Portfolio Section */}
      <section className="w-full text-center min-[601px]:text-start min-[601px]:pr-2">
        <h2 className="text-xl uppercase font-semibold min-[601px]:text-2xl">
          My Portfolio
        </h2>
        <div className="mt-8">
          <div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <p className="mt-2">
              Check out some of my recent projects. From screenplays to blog
              posts, I bring ideas to life with engaging stories and compelling
              narratives. 🎥 Ready to see your story come to life? <br />
              <Link href="/contact" className="underline">
                Let&apos;s work together!
              </Link>{" "}
              🌟
            </p>

            <div className="flex justify-center min-[601px]justify-start">
              <div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                whileHover={{ scale: 1.1 }}
                className="mt-6 origin-center"
              >
                <Button btnStyle={`${btnStyle} mt-4`}>
                  <Link href="/services">
                    <span className="underline">View My Portfolio</span> 💼
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Separator */}
      <div className="w-[99.175%] opacity-25 border-t border-primary-100 mt-15 mb-15 " />

      {/* Testimonials Section */}
      <section className="w-full relative text-start min-[601px]:pr-2">
        <h2 className="text-xl uppercase font-semibold text-center min-[601px]:text-start min-[601px]:text-2xl">
          Testimonials
        </h2>

        {/* Testimonial Display */}
        <div className="relative flex flex-col items-center justify-center mt-8">
          <div className="min-h-[10rem] flex items-center justify-center">
            <div
              key={index}
              className="p-6 bg-white rounded-lg text-center inline-block"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.5 }}
            >
              {/* Quote Icons & Text */}
              <p className="text-primary-500 italic flex items-center justify-center gap-2">
                <FaQuoteLeft className="text-4xl" />
                <span>{testimonials[index].text}</span>
                <FaQuoteRight className="text-4xl" />
              </p>

              {/* Author Name */}
              <p className="text-primary-500 mt-2 font-bold">
                {testimonials[index].name}
              </p>

              {/* Star Ratings */}
              <div className="flex justify-center mt-2 text-yellow-500">
                {Array.from({ length: testimonials[index].rating }).map(
                  (_, i) => (
                    <FaStar key={i} />
                  )
                )}
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex font-bold justify-center gap-4 mt-6">
            <Button btnStyle={btnStyle} onClick={prevTestimonial}>
              Prev
            </Button>
            <Button btnStyle={btnStyle} onClick={nextTestimonial}>
              Next
            </Button>
          </div>
        </div>
      </section>

      {/* Section Separator */}
      <div className="w-[99.175%] opacity-25 border-t border-primary-100 mt-15 mb-15 " />

      {/* Blog Section */}
      <section
        className="max-w-7xl cursor-pointer text-center min-[601px]:text-start min-[601px]:pr-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Link href="/blog">
          <h2
            className="text-xl uppercase font-semibold min-[601px]:text-2xl"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Latest Blog Post
          </h2>

          <div
            className="mt-8 grid grid-cols-1 md:grid-cols-[40%_60%] gap-6 md:gap-4 items-center"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {/* Image second on mobile, first on desktop */}
            <div className="w-full order-2 md:order-1">
              <img
                src="https://picsum.photos/id/60/400/300"
                alt="Blog post image"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>

            {/* Text Content (Title + Excerpt) */}
            <div className="order-1 md:order-2 flex flex-col h-full space-y-3 md:justify-start">
              <h2 className="text-2xl font-bold text-accent-950">
                The Art of Writing Engaging Dialogues
              </h2>
              <div className="md:self-center">
                <p>
                  Felis nascetur. Semper ridiculus. Vehicula. Pellentesque.
                  Feugiat. Ex senectus. Consequat. Dolor. Lacinia.Felis
                  nascetur. Semper ridiculus. Vehicula. Pellentesque. Feugiat.
                  Ex senectus. Consequat. Dolor. Lacinia.Felis nascetur. Semper
                  ridiculus. Vehicula. Pellentesque. Feugiat. Ex senectus.
                  Consequat. Dolor. Lacinia.
                </p>
              </div>
            </div>
          </div>
        </Link>
      </section>

      {/* Section Separator */}
      <div className="w-[99.175%] opacity-25 border-t border-primary-100 mt-15 mb-15 " />

      {/* Contact Section */}
      <section className="w-full md:w-4/5 max-w-3xl mb-10 text-start min-[601px]:pr-2">
        <h2 className="text-xl uppercase font-semibold text-center min-[601px]:text-start min-[601px]:text-2xl">
          Get in Touch
        </h2>
        <form className="mt-4 text-primary-50 space-y-4">
          <input
            type="text"
            placeholder="Name"
            className="w-full p-3 bg-primary-700 rounded-md"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 bg-primary-700 rounded-md"
          />
          <textarea
            placeholder="Message"
            className="w-full p-3 bg-primary-700 rounded-md"
          ></textarea>
          <button className="w-full px-6 py-3 font-bold bg-accent-950 uppercase rounded-md hover:bg-primary-700 transition cursor-pointer">
            Send Message
          </button>
        </form>
      </section>
    </>
  );
}
