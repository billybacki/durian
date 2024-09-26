import Dropzone, { Accept } from 'react-dropzone'
import DownloadIcon from 'assets/images/toolBox/ri_download-cloud-fill.svg'
import { Box, Typography, styled } from '@mui/material'
import { ReactNode } from 'react'
import { FontSize } from '@/themes'

export default function DropZone({
  getFile,
  accept,
  children
}: {
  getFile: (file: File) => void
  accept?: Accept
  children?: ReactNode
}) {
  return (
    <Dropzone accept={accept} onDrop={acceptedFiles => getFile(acceptedFiles[0])}>
      {({ getRootProps, getInputProps }) => (
        <>
          {children ? (
            <Box {...getRootProps()}>
              <input {...getInputProps()} />
              {children}
            </Box>
          ) : (
            <DotBox {...getRootProps()}>
              <input {...getInputProps()} />
              <DownloadIcon />
              <Typography
                color={'var(--ps-color-300)'}
                ml={10}
                fontSize={{ xs: FontSize.f13, md: FontSize.f15 }}
                fontFamily={'IBM Plex Sans'}
              >
                Drop file here to upload or <BlueHighLight>choose file</BlueHighLight>
              </Typography>
            </DotBox>
          )}
        </>
      )}
    </Dropzone>
  )
}

const DotBox = styled(Box)`
  display: flex;
  padding: 40px 24px;
  border-radius: 8px;
  border: 1px dashed var(--ps-color-300);
  cursor: pointer;
`

const BlueHighLight = styled(`span`)`
  color: #4e6ef3;
`
