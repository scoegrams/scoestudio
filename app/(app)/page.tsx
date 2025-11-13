import { getPayload } from '../../packages/payload/dist/index.js'
import configPromise from '@payload-config'
import Image from 'next/image'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

const categoryLabels: Record<string, string> = {
  murals: 'Murals',
  digital: 'Digital',
  sports: 'Sports',
  applied: 'Applied',
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; service?: string }>
}) {
  const params = await searchParams
  const payload = await getPayload({ config: configPromise })

  const where: any = {
    _status: {
      equals: 'published',
    },
  }

  if (params.category) {
    where.category = {
      equals: params.category,
    }
  }

  if (params.service) {
    where.services = {
      in: [params.service],
    }
  }

  const projects = await payload.find({
    collection: 'projects',
    depth: 2,
    limit: 100,
    overrideAccess: false,
    where,
    sort: '-publishedAt',
  })

  return (
    <main className="p-8 max-w-[1600px] mx-auto min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {projects.docs.map((project, index) => {
          const featuredImage =
            typeof project.featuredImage === 'object' && project.featuredImage
              ? project.featuredImage
              : null

          // Vary aspect ratios for visual interest (every 5th item is taller)
          const isTall = index % 5 === 0
          const aspectRatio = isTall ? 'aspect-[3/4]' : 'aspect-[4/3]'

          return (
            <Link
              key={project.id}
              href={`/projects/${project.slug}`}
              className="group no-underline text-inherit block"
            >
              <article className="h-full flex flex-col">
                {featuredImage?.url ? (
                  <div
                    className={`w-full ${aspectRatio} relative mb-4 bg-gray-100 overflow-hidden rounded-sm`}
                  >
                    <Image
                      src={featuredImage.url}
                      alt={project.title || 'Project image'}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                ) : (
                  <div
                    className={`w-full ${aspectRatio} relative mb-4 bg-gray-100 rounded-sm flex items-center justify-center`}
                  >
                    <span className="text-gray-400 text-sm">No image</span>
                  </div>
                )}
                <div className="flex-1 flex flex-col">
                  <h2 className="text-base font-normal mb-1 group-hover:text-gray-600 transition-colors">
                    {project.title}
                  </h2>
                  <p className="text-xs text-gray-500 mt-auto">
                    {project.category && categoryLabels[project.category]}
                    {project.year && ` • ${project.year}`}
                  </p>
                </div>
              </article>
            </Link>
          )
        })}
      </div>

      {projects.docs.length === 0 && (
        <div className="text-center py-16 text-gray-500">
          <p>No projects yet. Create some in the admin panel!</p>
          <Link href="/admin" className="text-black underline">
            Go to Admin
          </Link>
        </div>
      )}
    </main>
  )
}
