import React, { Fragment } from 'react'

import type { SanitizedCollectionConfig, SanitizedGlobalConfig } from 'payload/types'

import { Gutter } from '../Gutter'
import RenderTitle from '../RenderTitle'
import { DocumentTabs } from './Tabs'
import './index.scss'

const baseClass = `doc-header`

export const DocumentHeader: React.FC<{
  apiURL?: string
  collectionConfig?: SanitizedCollectionConfig
  customHeader?: React.ReactNode
  data?: any
  globalConfig?: SanitizedGlobalConfig
  id?: string
  isEditing?: boolean
}> = (props) => {
  const { id, apiURL, collectionConfig, customHeader, data, globalConfig, isEditing } = props

  return (
    <Gutter className={baseClass}>
      {customHeader && customHeader}
      {!customHeader && (
        <Fragment>
          <RenderTitle
            className={`${baseClass}__title`}
            useAsTitle={collectionConfig?.admin?.useAsTitle}
            globalLabel={globalConfig?.label}
            globalSlug={globalConfig?.slug}
            data={data}
            // fallback={`[${t('untitled')}]`}
          />
          <DocumentTabs
            apiURL={apiURL}
            // collection={collectionConfig}
            globalConfig={globalConfig}
            id={id}
            isEditing={isEditing}
          />
        </Fragment>
      )}
    </Gutter>
  )
}