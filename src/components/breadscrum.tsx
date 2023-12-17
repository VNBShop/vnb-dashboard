/** @format */
'use client'
import React, { useEffect, useState } from 'react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import Icon from '@/common/icons'

import { cn } from '../libs/utils'

const getPathFromUrl = (url: string): string => {
  return url.split(/[?#]/)[0]
}

const convertBreadcrumb = (
  title: string,
  toUpperCase: boolean | undefined,
  replaceCharacterList: Array<CharacterMap> | undefined,
  transformLabel?: ((title: string) => React.ReactNode) | undefined
): React.ReactNode => {
  let transformedTitle = getPathFromUrl(title)

  if (transformLabel) {
    return transformLabel(transformedTitle)
  }

  if (replaceCharacterList) {
    for (let i = 0; i < replaceCharacterList.length; i++) {
      transformedTitle = transformedTitle.replaceAll(
        replaceCharacterList[i].from,
        replaceCharacterList[i].to
      )
    }
  }

  return toUpperCase
    ? decodeURI(transformedTitle).toUpperCase()
    : decodeURI(transformedTitle)
}

export interface Breadcrumb {
  breadcrumb: string
  href: string
}

export interface CharacterMap {
  from: string
  to: string
}

export interface BreadcrumbsProps {
  rootLabel?: string | null
  omitRootLabel?: boolean
  labelsToUppercase?: boolean | undefined
  replaceCharacterList?: Array<CharacterMap> | undefined
  transformLabel?: ((title: string) => React.ReactNode) | undefined
  omitIndexList?: Array<number> | undefined
  listStyle?: any | null
}

const Breadcrumbs = ({
  rootLabel = 'Home',
  omitRootLabel = false,
  labelsToUppercase = false,
  replaceCharacterList = [
    { from: '-', to: ' ' },
    { from: '_', to: ' ' },
  ],
  transformLabel = undefined,
  omitIndexList = undefined,
  listStyle = null,
}: BreadcrumbsProps) => {
  const router = usePathname()
  const [breadcrumbs, setBreadcrumbs] = useState<Array<Breadcrumb> | null>(null)

  useEffect(() => {
    if (router) {
      const linkPath = router.split('/')
      linkPath.shift()

      const pathArray = linkPath.map((path, i) => {
        return {
          breadcrumb: path,
          href: '/' + linkPath.slice(0, i + 1).join('/'),
        }
      })

      setBreadcrumbs(pathArray)
    }
  }, [router])

  if (!breadcrumbs) {
    return null
  }

  return (
    <nav className="flex items-center" aria-label="breadcrumbs">
      <ol style={listStyle} className="flex items-center gap-1">
        {!omitRootLabel && (
          <li className="flex items-center gap-1">
            <Link href="/" className="text-sm text-[#7071E8]">
              {convertBreadcrumb(
                rootLabel || 'Home',
                labelsToUppercase,
                replaceCharacterList,
                transformLabel
              )}
            </Link>
          </li>
        )}
        {breadcrumbs.length >= 1 &&
          breadcrumbs.map((breadcrumb, i) => {
            if (
              !breadcrumb ||
              breadcrumb.breadcrumb.length === 0 ||
              (omitIndexList && omitIndexList.find((value) => value === i))
            ) {
              return
            }
            return (
              <li
                key={breadcrumb.href}
                className={
                  i === breadcrumbs.length - 1
                    ? 'flex items-center gap-1'
                    : 'flex items-center gap-1'
                }
              >
                <div className="mt-[2px]">
                  <Icon
                    name="ChevronRight"
                    width={16}
                    color="#7071E8"
                    height={16}
                  />
                </div>
                <Link href={breadcrumb.href} className="text-sm text-[#7071E8]">
                  {convertBreadcrumb(
                    breadcrumb.breadcrumb,
                    labelsToUppercase,
                    replaceCharacterList,
                    transformLabel
                  )}
                </Link>
              </li>
            )
          })}
      </ol>
    </nav>
  )
}

export default Breadcrumbs
