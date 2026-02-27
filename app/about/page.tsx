import Image from 'next/image'

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 dark:bg-black">
      {/* Hero Section */}
      <section className="px-4 pt-16 pb-12 text-center">
        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic">
          About <span className="text-primary">Yenko Dubs Snacks</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          We are dedicated to bringing the most premium and unique snacks
          directly to your doorstep. International delights at a fingersnap.
        </p>
      </section>

      {/* Content Grid */}
      <section className="container mx-auto grid gap-12 px-4 py-12 md:grid-cols-2 items-center">
        <div className="relative aspect-video overflow-hidden rounded-3xl bg-zinc-200">
          <Image
            src="/images/logo.png"
            alt="Our Story"
            fill
            className="object-contain p-12 opacity-50"
          />
        </div>

        <div className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">Our Mission</h2>
          <p className="text-lg text-muted-foreground">
            Founded with a passion for quality, Yenko Dubs Snacks started as a
            small project to help students and snack lovers find the best treats
            without the hassle. Today, we source products from all over to
            ensure every bite is an experience.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl border p-4">
              <h3 className="font-bold text-primary">100% Quality</h3>
              <p className="text-sm text-muted-foreground">
                Only the freshest items.
              </p>
            </div>
            <div className="rounded-2xl border p-4">
              <h3 className="font-bold text-primary">Fast Delivery</h3>
              <p className="text-sm text-muted-foreground">
                To Accra and its surroundings.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section Placeholder */}
      {/* <section className="bg-zinc-100 dark:bg-zinc-900/50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">The Team</h2>
          <div className="flex justify-center">
            <div className="flex flex-col items-center gap-4">
              <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary">
                <span className="text-2xl font-bold">AT</span>
              </div>
              <div>
                <h3 className="font-bold">Abdul-Azeem Traoure Mohammed</h3>
                <p className="text-sm text-muted-foreground">
                  Founder & Lead Engineer
                </p>
              </div>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  )
}
