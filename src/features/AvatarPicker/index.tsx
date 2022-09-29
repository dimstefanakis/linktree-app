import { useRef, useState, useEffect } from "react";
import { RefObject, MutableRefObject } from "react";
import {
  Avatar,
  Input,
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftElement,
  FormErrorMessage,
  Code,
  Icon,
} from "@chakra-ui/react";
import { useController } from "react-hook-form";

interface AvatarPickerProps {
  control: any;
  isRequired?: boolean;
}

function AvatarPicker({ control, isRequired = false }: AvatarPickerProps) {
  const [preview, setPreview] = useState("");
  const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const {
    field: { ref, value, onChange, ...inputProps },
  } = useController({
    name: "avatar",
    control,
    rules: { required: isRequired },
  });

  useEffect(() => {
    if (value) {
      // create the preview
      const objectUrl = URL.createObjectURL(value);
      setPreview(objectUrl);

      // free memory when ever this component is unmounted
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [value]);

  console.log("value", value);
  return (
    <FormControl isRequired>
      {/* <FormLabel htmlFor="writeUpFile">{children}</FormLabel> */}
      <InputGroup justifyContent="center">
        {/* <InputLeftElement
          pointerEvents="none"
          children={<Icon as={FiFile} />}
        /> */}
        <input
          type="file"
          //accept={acceptedFileTypes}
          ref={inputRef}
          {...inputProps}
          onChange={(e) => {
            if (e.target.files) {
              onChange(e?.target?.files[0]);
            }
          }}
          style={{ display: "none" }}
        ></input>
        <Avatar
          size="2xl"
          onClick={() => inputRef?.current?.click()}
          src={preview}
        />
      </InputGroup>
    </FormControl>
  );
}

export default AvatarPicker;
