import { getPayload } from '../../../../packages/payload/dist/index.js'
import configPromise from '@payload-config'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

const categoryLabels: Record<string, string> = {
  murals: 'Murals',
  digital: 'Digital',
  sports: 'Sports',
  applied: 'Applied',
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const payload = await getPayload({ config: configPromise })

  const projects = await payload.find({
    collection: 'projects',
    depth: 2,
    limit: 1,
    overrideAccess: false,
    where: {
      slug: {
        equals: slug,
      },
      _status: {
        equals: 'published',
      },
    },
  })

  const project = projects.docs[0]

  if (!project) {
    notFound()
  }

  const featuredImage =
    typeof project.featuredImage === 'object' && project.featuredImage
      ? project.featuredImage
      : null

  return (
    <main className="p-8 max-w-5xl mx-auto pt-6">
      <Link href="/" className="inline-block mb-8 no-underline text-black hover:text-gray-600">
        ← Back to Projects
      </Link>

      <article>
        <header className="mb-12">
          <h1 className="text-4xl font-normal mb-4">{project.title}</h1>
          <div className="flex gap-4 text-gray-600 text-sm">
            {project.category && <span>{categoryLabels[project.category]}</span>}
            {project.year && <span>• {project.year}</span>}
            {project.client && <span>• {project.client}</span>}
            {project.location && <span>• {project.location}</span>}
          </div>
        </header>

        {featuredImage?.url && (
          <div className="w-full aspect-video relative mb-12 bg-gray-100">
            <Image
              src={featuredImage.url}
              alt={project.title || 'Project image'}
              fill
              className="object-cover"
            />
          </div>
        )}

        {project.description && (
          <div className="mb-12 text-base leading-relaxed max-w-3xl">
            <p className="whitespace-pre-wrap">{project.description}</p>
          </div>
        )}

        {project.gallery && project.gallery.length > 0 && (
          <div className="mb-12">
            <h2 className="text-xl font-normal mb-8">Gallery</h2>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-8">
              {project.gallery.map((item, index) => {
                const image = typeof item.image === 'object' && item.image ? item.image : null
                if (!image?.url) return null

                return (
                  <div key={index} className="w-full aspect-[4/3] relative bg-gray-100">
                    <Image
                      src={image.url}
                      alt={item.caption || `Gallery image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                    {item.caption && (
                      <p className="absolute bottom-0 left-0 right-0 p-4 bg-black/70 text-white text-sm m-0">
                        {item.caption}
                      </p>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {project.processImages && project.processImages.length > 0 && (
          <div className="mb-12">
            <h2 className="text-xl font-normal mb-8">Process</h2>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-8">
              {project.processImages.map((item, index) => {
                const image = typeof item.image === 'object' && item.image ? item.image : null
                if (!image?.url) return null

                return (
                  <div key={index} className="w-full aspect-[4/3] relative bg-gray-100">
                    <Image
                      src={image.url}
                      alt={item.caption || `Process image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                    {item.caption && (
                      <p className="absolute bottom-0 left-0 right-0 p-4 bg-black/70 text-white text-sm m-0">
                        {item.caption}
                      </p>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </article>
    </main>
  )
}
