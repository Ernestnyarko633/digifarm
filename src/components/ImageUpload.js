/* eslint-disable */
import { Box, Flex, Icon, Image, Input, Text } from "@chakra-ui/react";
import React from "react";
import { useDropzone } from "react-dropzone";
import { BsX } from "react-icons/bs";
import PropTypes from "prop-types";

const ImageUpload = ({ files, setFiles }) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      acceptedFiles.forEach(async (file) => {
        const formData = new FormData();
        formData.append("file", file, file?.name);
      });
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const removeImage = (id) => {
    const newImages = files.filter((item) => item.name !== id);
    setFiles(newImages);
  };

  const thumbs = files.map((file) => {
    console.log("file", file);
    return (
      <Box
        d="inline-block"
        mr={4}
        w="100%"
        boxSizing="border-box"
        key={file?.name}
        pos="relative"
      >
        <Flex
          align="center"
          justify="center"
          as="button"
          role="button"
          aria-label="close button"
          w={6}
          h={6}
          rounded="100%"
          bg="white"
          color="gray.700"
          pos="absolute"
          top={2}
          right={2}
          onClick={() => removeImage(file?.name)}
        >
          <Icon as={BsX} />
        </Flex>
        <Flex minW={0} overflow="hidden">
          <Image d="block" w="auto" h="100%" src={file?.preview} />
        </Flex>
      </Box>
    );
  });

  React.useEffect(
    () => () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  return (
    <Box borderWidth={1} borderColor="gray.200" p={{ md: 8 }}>
      <Box {...getRootProps({ className: "dropzone" })}>
        <Input {...getInputProps()} />
        {files?.length === 0 && (
          <Text color="gray.500" fontSize="sm">
            Drag 'n' drop some files here, or click to select files
          </Text>
        )}
      </Box>
      <Box wrap="wrap" mt={10} as="aside">
        {thumbs}
      </Box>
    </Box>
  );
};

ImageUpload.propTypes = {
  files: PropTypes.array,
  setFiles: PropTypes.func,
};

export default ImageUpload;
