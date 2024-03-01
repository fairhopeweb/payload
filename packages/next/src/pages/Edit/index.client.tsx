'use client'
import type { EditViewProps } from 'payload/config'

import {
  LoadingOverlay,
  SetViewActions,
  useComponentMap,
  useConfig,
  useDocumentInfo,
} from '@payloadcms/ui'
import { redirect } from 'next/navigation'
import React, { Fragment, useEffect } from 'react'
import { useCallback } from 'react'

export const EditViewClient: React.FC<EditViewProps> = () => {
  const { id, collectionSlug, getDocPermissions, getVersions, globalSlug, setDocumentInfo } =
    useDocumentInfo()
  const {
    routes: { api: adminRoute },
  } = useConfig()

  const { getComponentMap } = useComponentMap()

  const { Edit, actionsMap } = getComponentMap({
    collectionSlug,
    globalSlug,
  })

  const isEditing = Boolean(id && collectionSlug)

  const onSave = useCallback(
    async (json: { doc }) => {
      getVersions()
      getDocPermissions()

      if (!isEditing) {
        redirect(`${adminRoute}/collections/${collectionSlug}/${json?.doc?.id}`)
      } else {
        // buildState(json.doc, {
        //   fieldSchema: collection.fields,
        // })
        // setFormQueryParams((params) => ({
        //   ...params,
        //   uploadEdits: undefined,
        // }))
      }
    },
    [getVersions, isEditing, getDocPermissions, collectionSlug, adminRoute],
  )

  useEffect(() => {
    setDocumentInfo((current) => ({
      ...current,
      onSave,
    }))
  }, [setDocumentInfo, onSave])

  // Allow the `DocumentInfoProvider` to hydrate
  if (!Edit || (!collectionSlug && !globalSlug)) {
    return <LoadingOverlay />
  }

  return (
    <Fragment>
      <SetViewActions actions={actionsMap?.Edit?.Default} />
      {Edit}
    </Fragment>
  )
}
