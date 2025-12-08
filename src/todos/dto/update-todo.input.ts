import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateTodoInput {
  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  isFavourite?: boolean;

  @Field({ nullable: true })
  isCompleted?: boolean;
}
