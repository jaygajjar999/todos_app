import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateTodoInput {
  @Field()
  title: string;

  @Field({ defaultValue: false })
  isFavourite?: boolean;

  @Field({ defaultValue: false })
  isCompleted?: boolean;
}
