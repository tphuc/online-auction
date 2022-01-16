
import { Box, Image, InputGroup } from '@chakra-ui/react';
import React, { useRef } from 'react';




export function FileUpload(props) {
  const { register, accept, multiple, children } = props
  const inputRef = useRef(null)
  const { ref, onChange,  ...rest } = register
  const [preview, setPreview] = React.useState(null)



  const handleClick = () => inputRef.current?.click()

  return (
    <>
      <InputGroup onClick={handleClick}>
        <input
          type={'file'}
          multiple={multiple || false}
          hidden
          accept={accept}
          {...rest}
          onChange={(e) => {
            setPreview(Object.values(e.target.files))
            onChange(e)
          }}
          ref={(e) => {
            ref(e)
            inputRef.current = e
          }}
        />
        <>
          {children}
        </>

      </InputGroup>
      <Box display={'flex'} flexWrap={'wrap'}>
        {preview?.map((item, id) => <Box key={id} my='1em' mx='1em' borderRadius={'10px'} display={'inline-block'} bg='brand.000' p='5px'>
          <Image objectFit={'contain'} maxWidth={100} height={100} alt='' src={URL.createObjectURL(item)}></Image>
        </Box>)}
      </Box>

    </>
  )
}